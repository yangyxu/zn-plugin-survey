var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			model: 'ZNPluginSurveyPaper',
			status: 0,
			data: zn.store.post('/zn.plugin.survey/paper/getPapersByType', { type: this.props.data ? this.props.data.value : null, status: 0 }),
			formItems: [{ title: '问卷标题', name: 'zn_title', type: 'Input', required: true, error: '用户名必填项!' }, { title: '最大限制', name: 'max_count', type: 'Input', attrs: { type: 'number' } }, { title: '开始时间', name: 'start_time', type: 'Input', attrs: { type: 'date' } }, { title: '结束时间', name: 'end_time', type: 'Input', attrs: { type: 'date' } }, { title: '附件', name: 'attachments', type: 'FileUploader' }, { title: '备注', name: 'comment', type: 'Textarea' }, { title: '说明', name: 'zn_note', type: 'Textarea' }],
			toolbarItems: [{ text: '添加', name: 'add', icon: 'fa-plus', style: { marginRight: 5 } }]
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.data != this.props.data) {
			this.state.data._data.type = nextProps.data.value;
			this.state.data.refresh();
		}
	},
	__onStatusChange: function __onStatusChange(value) {
		this.setState({
			status: value.value
		});
		this.state.data._data.status = value.value;
		this.state.data.refresh();
	},
	__renderStatus: function __renderStatus(status) {
		switch (status) {
			case 0:
				return React.createElement(
					'span',
					null,
					'\u5F85\u53D1\u5E03'
				);
			case 1:
				return React.createElement(
					'span',
					null,
					'\u5DF2\u53D1\u5E03'
				);
			case 2:
				return React.createElement(
					'span',
					null,
					'\u5DF2\u7ED3\u675F'
				);
			case -1:
				return React.createElement(
					'span',
					null,
					'\u4E0B\u7EBF'
				);
		}
	},
	__onItemRender: function __onItemRender(item) {
		var _this = this;

		return React.createElement(
			'div',
			{ className: 'inner' },
			React.createElement(
				'div',
				{ className: 'inner-left', style: { width: 80 } },
				React.createElement(zn.react.ProgressRing, { style: { padding: 10 }, full: false, value: 35 })
			),
			React.createElement(
				'div',
				{ className: 'inner-right' },
				React.createElement(
					'div',
					{ className: 'r-header' },
					React.createElement(
						'span',
						{ className: 'name', onClick: function onClick() {
								return zn.react.session.relativeJump('/znpluginsurvey.paper.info', { znid: item.zn_id });
							} },
						item.zn_title
					),
					React.createElement(
						'span',
						{ className: 'h-tag' },
						this.__renderStatus(item.status)
					),
					React.createElement('i', { 'data-tooltip': '\u4FEE\u6539\u4FE1\u606F', onClick: function onClick() {
							return _this.__updateItem(item);
						}, className: 'fa fa-edit h-btn' })
				),
				React.createElement(
					'div',
					{ className: 'r-item' },
					React.createElement(
						'span',
						{ className: '_key' },
						'\u6700\u5927\u9650\u5236'
					),
					React.createElement(
						'span',
						{ className: 'h-tag' },
						item.max_count
					)
				),
				React.createElement(
					'div',
					{ className: 'r-item' },
					React.createElement(
						'span',
						{ className: '_key' },
						'\u9884\u8BA1\u5468\u671F\uFF1A'
					),
					React.createElement(
						'span',
						{ className: '_value' },
						(item.start_time || '').toString().split(' ')[0],
						' ~ ',
						(item.end_time || '').toString().split(' ')[0]
					)
				),
				React.createElement(
					'div',
					{ className: 'r-item' },
					React.createElement(
						'span',
						{ className: '_key' },
						'\u521B\u5EFA\u65F6\u95F4\uFF1A'
					),
					React.createElement(
						'span',
						{ className: '_value' },
						item.zn_create_time
					)
				),
				React.createElement(
					'div',
					{ className: 'r-item' },
					React.createElement(
						'span',
						{ className: '_key' },
						'\u5907\u6CE8\uFF1A'
					),
					React.createElement(
						'span',
						{ className: '_value' },
						item.comment
					)
				)
			)
		);
	},
	__doSuccess: function __doSuccess() {
		this.state.data.refresh();
	},
	__addItem: function __addItem() {
		zn.dialog({
			title: '新增问卷',
			content: React.createElement(zn.react.Form, {
				action: '/zn.plugin.admin/model/insert',
				merge: 'values',
				hiddens: { zn_id: zn.uuid(), type_id: this.props.data.value },
				exts: { model: this.state.model },
				onSubmitSuccess: this.__doSuccess,
				items: this.state.formItems })
		});
	},
	__updateItem: function __updateItem(data) {
		zn.dialog({
			title: '更新问卷',
			content: React.createElement(zn.react.Form, {
				merge: 'updates',
				action: '/zn.plugin.admin/model/update',
				exts: { model: this.state.model, where: { id: data.id } },
				value: zn.store.post('/zn.plugin.admin/model/selectOne', { model: this.state.model, where: { id: data.id } }),
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
	render: function render() {
		return React.createElement(
			zn.react.Page,
			{ canBack: false, className: 'zn-plugin-survey-list-view', title: '\u95EE\u5377\u5217\u8868', toolbarItems: this.props.data ? this.state.toolbarItems : [], onToolbarClick: this.__onToolbarClick,
				headerCenter: React.createElement(zn.react.ListView, {
					className: 'zr-tab-ios',
					selectMode: 'radio',
					valueKey: 'status',
					onClick: this.__onStatusChange,
					value: this.state.status,
					data: [{ status: 0, text: '待发布' }, { status: 1, text: '已发布' }, { status: 2, text: '已结束' }] }) },
			React.createElement(zn.react.PagerView, {
				view: 'ListView',
				className: 'projects',
				data: this.state.data,
				itemRender: this.__onItemRender })
		);
	}
});