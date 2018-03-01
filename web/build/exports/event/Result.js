var React = require('react');
module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			event: null,
			fields: null
		};
	},
	componentDidMount: function componentDidMount() {
		this.__loadEventMate();
	},
	__loadEventMate: function __loadEventMate() {
		zn.http.post('/zn.plugin.survey/event/getEventFields', {
			event_uuid: this.props.request.search.event_uuid
		}).then(function (data) {
			if (data.status == 200) {
				var _data = data.result;
				_data.fields = _data.fields.map(function (field, index) {
					return {
						title: field.title,
						name: field.name,
						width: field.width
					};
				});
				_data.fields.unshift({
					title: '微信账号',
					name: 'openid_convert',
					width: 200
				});
				_data.fields.push({
					title: '提交时间',
					name: 'zn_create_time',
					width: 130
				});
				this.setState(_data);
			} else {
				zn.notification.error(data.result);
			}
		}.bind(this), function (err) {
			zn.notification.error("网络请求失败");
		});
	},
	__doSuccess: function __doSuccess() {
		this.state.data.refresh();
	},
	__addItem: function __addItem() {
		zn.dialog({
			title: '新增用户',
			content: React.createElement(zn.react.Form, {
				action: '/zn.plugin.admin/model/insert',
				merge: 'values',
				exts: { model: this.props.model },
				onSubmitSuccess: this.__doSuccess,
				items: this.state.formItems })
		});
	},
	__removeItems: function __removeItems() {
		var _self = this,
		    _values = this.refs.table.getValue();
		if (_values && _values.length) {
			zn.confirm('确认删除这' + _values.length + '个用户吗？', '提示', function () {
				zn.http.post('/zn.plugin.admin/model/delete', {
					model: this.props.model,
					where: "id in (" + _values.join(',') + ")"
				}).then(function () {
					zn.toast.success('删除成功');
					_self.state.data.refresh();
				}, function (data) {
					zn.toast.error('删除失败: ' + data.result);
				});
			}.bind(this));
		} else {
			zn.toast.warning('请先选择要删除的用户');
		}
	},
	__onToolbarClick: function __onToolbarClick(item) {
		switch (item.name) {
			case 'add':
				this.__addItem();
				break;
			case 'remove':
				this.__removeItems();
				break;
		}
	},
	__onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
		switch (columnIndex) {
			case 1:
				var _value = value.split('&&__zn__&&');
				return React.createElement(
					'div',
					{ style: { display: 'flex', alignItems: 'center' } },
					_value[1] && React.createElement('img', { className: 'avatar', style: { width: 16, height: 16, margin: 5, borderRadius: 16 }, src: _value[1] }),
					React.createElement(
						'a',
						{ onClick: function onClick() {
								return zn.react.session.relativeJump('/znpluginwechat.user.info', { openid: data.zn_plugin_wechat_open_id });
							} },
						_value[0]
					)
				);
		}
	},
	render: function render() {
		return React.createElement(
			zn.react.Page,
			{ title: this.state.event ? this.state.event.zn_title : "活动报表", toolbarItems: this.state.toolbarItems, onToolbarClick: this.__onToolbarClick },
			this.state.event ? React.createElement(zn.react.PagerView, {
				ref: 'table',
				view: 'Table',
				enableFilter: true,
				checkbox: 50,
				showHeader: true,
				columnRender: this.__onTableColumnRender,
				data: zn.store.post('/zn.plugin.survey/event/pagingEventResult', { event_uuid: this.state.event.zn_id }),
				items: this.state.fields }) : React.createElement(zn.react.DataLoader, { content: '\u52A0\u8F7D\u4E2D...', loader: 'timer' })
		);
	}
});