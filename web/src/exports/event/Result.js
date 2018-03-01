var React = require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			event: null,
			fields: null,
			data: null,
			toolbarItems: [
				{ text: '批量删除', name: 'remove', status: 'danger', icon: 'fa-remove', style: { marginRight: 5 } },
				{ text: '导出为Excel', name: 'exports', status: 'warning', icon: 'fa-download', style: { marginRight: 5 } }
			]
		}
	},
	componentDidMount: function (){
		this.__loadEventMate();
	},
	__loadEventMate: function (){
		zn.http.post('/zn.plugin.survey/event/getEventFields', {
			event_uuid: this.props.request.search.event_uuid
		}).then(function (data){
			if(data.status==200){
				var _data = data.result;
				_data.fields = _data.fields.map(function (field, index){
					return {
						title: field.title,
						name: field.name,
						width: field.width
					}
				});
				_data.fields.push({
					title: '微信账号',
					name: 'openid_convert',
					width: 200
				});
				_data.fields.push({
					title: '提交时间',
					name: 'zn_create_time',
					width: 130
				});
				_data.data = zn.store.post('/zn.plugin.survey/event/pagingEventResult', { event_uuid: _data.event.zn_id });
				this.setState(_data);
			}else {
				zn.notification.error(data.result);
			}
		}.bind(this), function (err){
			zn.notification.error("网络请求失败");
		});
	},
	__doSuccess: function (){
		this.state.data.refresh();
	},
	__addItem: function (){
		zn.dialog({
			title: '新增用户',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/insert'
				merge='values'
				exts={{ model: this.props.model }}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__removeItems: function (){
		var _self = this,
			_values = this.refs.table.getValue();
		if(_values && _values.length){
			zn.confirm('确认删除这' + _values.length + '个用户吗？', '提示', function () {
				zn.preloader.open({
					content: '删除中...'
				});
				zn.http.post('/zn.plugin.survey/event/deleteEventResult', {
					event_uuid: this.state.event.zn_id,
					ids: _values.join(',')
				}).then(function (data){
					if(data.status==200){
						zn.toast.success('删除成功');
						_self.refs.table.setValue([]);
						_self.state.data.refresh();
					}else {
						zn.toast.error(data.result);
					}
					zn.preloader.close();
				}, function (data){
					zn.toast.error("网络请求失败");
					zn.preloader.close();
				});
			}.bind(this));
		}else {
			zn.toast.warning('请先选择要删除的用户');
		}
	},
	__onToolbarClick: function (item){
		switch (item.name) {
			case 'exports':
				zn.react.downloadURL(zn.http.fixURL('/zn.plugin.survey/event/downloadEventResult') + "?event_uuid=" + this.state.event.zn_id, this.state.event.zn_title);
				break;
			case 'remove':
				this.__removeItems();
				break;
		}
	},
	__onTableColumnRender: function (rowIndex, columnIndex, data, item, value){
		switch (columnIndex) {
			case 1:
				if(value && value.split){
					var _value = value.split('&&__zn__&&');
					return <div style={{ display: 'flex', alignItems: 'center' }}>
						{_value[1] && <img className="avatar" style={{ width: 16, height: 16, margin: 5, borderRadius: 16 }} src={_value[1]} />}
						<a onClick={()=>zn.react.session.relativeJump('/znpluginwechat.user.info', { openid: data.zn_plugin_wechat_open_id })}>{_value[0]}</a>
					</div>;
				}
		}
	},
	render:function(){
		return (
			<zn.react.Page title={this.state.event ? this.state.event.zn_title: "活动报表"} toolbarItems={this.state.toolbarItems} onToolbarClick={this.__onToolbarClick}>
				{
					this.state.event ? <zn.react.PagerView
						ref="table"
						view="Table"
						enableFilter={true}
						checkbox={50}
						showHeader={true}
						columnRender={this.__onTableColumnRender}
						data={this.state.data}
						items={this.state.fields}/> : <zn.react.DataLoader content="加载中..." loader="timer" />
				}
			</zn.react.Page>
		);
	}
});
