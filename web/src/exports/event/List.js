var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			model: 'ZNPluginSurveyEvent',
			status: 0,
			data: zn.store.post('/zn.plugin.survey/event/getEventsByType', { type: this.props.data?this.props.data.value:null, status: 0 }),
			formItems: [
				{ title: '活动名称', name: 'zn_title', type: 'Input', required: true, error: '名称必填项!' },
				{ title: '最大限制', name: 'max_count', type: 'Input', attrs: { type: 'number' } },
				{ title: '开始时间', name: 'start_time', type: 'Input', attrs: { type:'date' } },
				{ title: '结束时间', name: 'end_time', type: 'Input', attrs: { type:'date' } },
				{ title: '成功消息', name: 'success_message', type: 'RichEditor' },
				{ title: '失败消息', name: 'error_message', type: 'RichEditor' },
				{ title: '附件', name: 'attachments', type: 'FileUploader' },
				{ title: '备注', name: 'comment', type: 'Textarea' },
				{ title: '说明', name: 'zn_note', type: 'Textarea' }
			],
			toolbarItems: [
				{ text: '创建活动', name: 'add', icon: 'fa-plus', style: { marginRight: 8 } },
				//{ text: '删除', name: 'remove', status: 'danger', icon: 'fa-remove', style: { marginRight: 5 } }
			]
		}
	},
	componentWillReceiveProps: function (nextProps){
		if(nextProps.data!=this.props.data){
			this.state.data._data.type = nextProps.data.value;
			this.state.data.refresh();
		}
	},
	__onStatusChange: function (value){
		this.setState({
			status: value.value
		});
		this.state.data._data.status = value.value;
		this.state.data.refresh();
	},
	__renderStatus: function (status){
		switch (status) {
			case 0:
				return <span>待发布</span>;
			case 1:
				return <span style={{color:'green'}}>已发布</span>;
			case 2:
				return <span style={{color:'red'}}>已结束</span>;
			case -1:
				return <span>下线</span>;
		}
	},
	__viewEventChart: function (item){

	},
	__onItemRender: function (item){
		return <div className="inner">
			<div className="inner-left" style={{width: 80}}>
				<zn.react.ProgressRing style={{margin: "0 auto"}} full={false} value={item.count/item.max_count * 100} />
				{
					!(item.status==0)?<span onClick={()=>this.__viewEventChart(item)} className="btn"><i className="fa fa-pie-chart zr-padding-3" />查看报表</span>:<span></span>
				}
			</div>
			<div className="inner-right">
				<div className="r-header">
					<span className="name" onClick={()=>zn.react.session.relativeJump('/znpluginsurvey.event.info', { znid: item.zn_id })}>{item.zn_title}</span>
					<span className="h-tag">
						{
							!!(item.status==0)?<i data-tooltip="部署" onClick={()=>this.__deployItem(item)} className="fa fa-telegram zr-padding-3" />:<i data-tooltip="重新发布" onClick={()=>this.__deployItem(item)} className="fa fa-telegram zr-padding-3" />
						}
						{this.__renderStatus(item.status)}
					</span>
					<i data-tooltip="修改信息" onClick={()=>this.__updateItem(item)} className="fa fa-edit h-btn" />
				</div>
				<div className="r-item">
					<span className="_key">当前进度</span>
					<span className="h-tag"><strong style={{color: '#800010'}} data-tooltip={item.zn_modify_time?('最近一次报名时间：' + item.zn_modify_time):''}>{item.count}</strong> / {item.max_count}</span>
				</div>
				<div className="r-item">
					<span className="_key">预计周期：</span>
					<span className="_value">{(item.start_time||'').toString().split(' ')[0]} ~ {(item.end_time||'').toString().split(' ')[0]}</span>
				</div>
				<div className="r-item">
					<span className="_key">创建时间：</span>
					<span className="_value">{item.zn_create_time}</span>
				</div>
				<div className="r-item">
					<span className="_key">备注：</span>
					<span className="_value">{item.comment}</span>
				</div>
			</div>
		</div>;
	},
	__doSuccess: function (){
		this.state.data.refresh();
	},
	__addItem: function (){
		zn.dialog({
			title: '创建活动',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/insert'
				merge='values'
				hiddens={{zn_id: zn.uuid(), type_id: this.props.data.value, table_name: this.props.data.data.table_prefix + '_' + zn.date.nowDateString() + '_' + zn.util.randomNumbers(6)  }}
				exts={{ model: this.state.model }}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__updateItem: function (data){
		zn.dialog({
			title: '修改活动信息',
			content: <zn.react.Form
				merge="updates"
				action='/zn.plugin.admin/model/update'
				exts={{ model: this.state.model, where: {id: data.id} }}
				value={zn.store.post('/zn.plugin.admin/model/selectOne', { model: this.state.model, where: {id: data.id} })}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__deployItem: function (item) {
		zn.confirm('确认发布该活动？', '提示', function () {
			zn.http.post('/zn.plugin.survey/event/deployEvent', {
				event_id: item.id
			}).then(function (){
				zn.notification.success('发布成功');
				this.__doSuccess();
			}.bind(this), function (data){
				zn.notification.error('发布失败: ' + data.result);
			});
		}.bind(this));
	},
	__removeItems: function (){
		var _self = this,
			_values = this.refs.table.getValue();
		if(_values && _values.length){
			zn.confirm('确认删除这' + _values.length + '个用户吗？', '提示', function () {
				zn.http.post('/zn.plugin.admin/model/delete', {
					model: this.props.model,
					where: "id in (" + _values.join(',') + ")"
				}).then(function (){
					zn.toast.success('删除成功');
					_self.state.data.refresh();
				}, function (data){
					zn.toast.error('删除失败: ' + data.result);
				});
			}.bind(this));
		}else {
			zn.toast.warning('请先选择要删除的用户');
		}
	},
	__onToolbarClick: function (item){
		switch (item.name) {
			case 'add':
				this.__addItem();
				break;
			case 'remove':
				this.__removeItems();
				break;
		}
	},
	render:function(){
		return (
			<zn.react.Page canBack={false} className="zn-plugin-survey-list-view" title='活动列表' toolbarItems={this.props.data?this.state.toolbarItems:[]} onToolbarClick={this.__onToolbarClick}
				headerCenter={<zn.react.ListView
					className="zr-tab-ios"
					selectMode="radio"
					valueKey="status"
					onClick={this.__onStatusChange}
					value={this.state.status}
					data={[
						{ status: 0, text: '待发布' },
						{ status: 1, text: '已发布' },
						{ status: 2, text: '已结束' }
					]} />} >
				<zn.react.PagerView
					view="ListView"
					className="projects"
					data={this.state.data}
					itemRender={this.__onItemRender}/>
			</zn.react.Page>
		);
	}
});
