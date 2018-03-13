var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var QRCode = require('qrcode.react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			event: null,
			fields: [],
			formItems: [{ title: '标题', name: 'title', type: 'Input', required: true, error: '必填项!' }, {
				title: '是否必填字段',
				name: 'required',
				type: 'Radio',
				value: 0,
				data: [{ text: '否', value: 0 }, { text: '是', value: 1 }]
			}, {
				title: '类型',
				name: 'type',
				type: 'Select',
				data: [{ text: '组标题', value: 'FormTitle' }, { text: '单行输入框', value: 'Input' }, { text: '数字框', value: 'Input_number' }, { text: '日期框', value: 'Input_date' }, { text: '时间框', value: 'DateTime' }, { text: '组合框', value: 'MultiInput' }, { text: '选择框', value: 'Select' }, { text: '单图片', value: 'ImageUploader' }, { text: '多文件', value: 'FileUploader' }, { text: '是否框', value: 'Checkbox' }, { text: '多选框', value: 'CheckboxGroup' }, { text: '单选框', value: 'Radio' }, { text: '多行输入框', value: 'Textarea' }],
				onChange: function onChange(data, item, select) {
					if (data) {
						if (data.value.indexOf('Input_') != -1) {
							select.props.form.state.hiddens.attrs = JSON.stringify({
								type: data.value.split('_')[1]
							});
						}
					}
				}
			}, { title: '数据源', name: 'data', type: 'Textarea' }, { title: '字段说明', name: 'zn_note', type: 'Textarea' }],
			toolbarItems: [{ text: '添加字段', name: 'add', icon: 'fa-plus', style: { marginRight: 5 } }]
		};
	},
	componentDidMount: function componentDidMount() {
		this.__loadMeta();
	},
	__loadMeta: function __loadMeta() {
		zn.preloader.open({
			content: '加载中...'
		});
		zn.http.post('/zn.plugin.survey/event/getEventFields', {
			event_uuid: this.props.request.search.znid
		}).then(function (data) {
			if (data.status == 200) {
				this.setState(data.result);
			} else {
				zn.notification.error(data.result);
			}
			zn.preloader.close();
		}.bind(this), function (error) {
			zn.notification.error('请求网络失败');
			zn.preloader.close();
		});
	},
	__onAddSubmitBefore: function __onAddSubmitBefore(data) {
		for (var key in data) {
			if (key.indexOf('.') != -1) {
				var _value = data[key],
				    _keys = key.split('.');
				if (!data[_keys[0]]) {
					data[_keys[0]] = {};
				}
				data[_keys[0]][_keys[1]] = _value;
				data[key] = null;
				delete data[key];
			}
		}
		zn.http.post('/zn.plugin.survey/event/createEventField', data).then(function (data) {
			if (data.status == 200) {
				this.__loadMeta();
			} else {
				zn.notification.error(data.result);
			}
		}.bind(this), function (err) {
			zn.notification.error('网络请求失败');
		}.bind(this));
		return false;
	},
	__addItem: function __addItem() {
		zn.dialog({
			title: '添加字段',
			content: React.createElement(zn.react.Form, {
				hiddens: { zn_id: zn.uuid(), event_id: this.state.event.id, field_order: this.state.fields.length + 1 },
				onSubmitBefore: this.__onAddSubmitBefore,
				items: this.state.formItems })
		});
	},
	__updateItem: function __updateItem(data) {
		zn.dialog({
			title: '更新字段',
			content: React.createElement(zn.react.Form, {
				merge: 'updates',
				action: '/zn.plugin.admin/model/update',
				exts: { model: 'ZNPluginSurveyEventField', where: { id: data.id } },
				value: zn.store.post('/zn.plugin.admin/model/selectOne', { model: 'ZNPluginSurveyEventField', where: { id: data.id } }),
				onSubmitSuccess: this.__loadMeta,
				items: this.state.formItems })
		});
	},
	__removeItem: function __removeItem(item) {
		zn.confirm('确认删除这个字段吗？', '提示', function () {
			zn.preloader.open({ title: '删除中...' });
			zn.http.post('/zn.plugin.admin/model/delete', {
				model: 'ZNPluginSurveyEventField',
				where: {
					id: item.id
				}
			}).then(function (data) {
				if (data.status == 200) {
					zn.notification.success('删除成功');
					this.__loadMeta();
				} else {
					zn.notification.error(data.result);
				}
				zn.preloader.close();
			}.bind(this), function (data) {
				zn.notification.error("网络请求失败");
				zn.preloader.close();
			});
		}.bind(this));
	},
	__upItem: function __upItem(item) {
		zn.preloader.open({ title: '升序中...' });
		zn.http.post('/zn.plugin.survey/event/orderField', {
			field_id: item.id,
			order: 'up'
		}).then(function (data) {
			if (data.status == 200) {
				zn.notification.success('升序成功');
				this.__loadMeta();
			} else {
				zn.notification.error(data.result);
			}
			zn.preloader.close();
		}.bind(this), function (data) {
			zn.notification.error("网络请求失败");
			zn.preloader.close();
		});
	},
	__downItem: function __downItem(item) {
		zn.preloader.open({ title: '降序中...' });
		zn.http.post('/zn.plugin.survey/event/orderField', {
			field_id: item.id,
			order: 'down'
		}).then(function (data) {
			if (data.status == 200) {
				zn.notification.success('降序成功');
				this.__loadMeta();
			} else {
				zn.notification.error(data.result);
			}
			zn.preloader.close();
		}.bind(this), function (data) {
			zn.notification.error("网络请求失败");
			zn.preloader.close();
		});
	},
	__itemRender: function __itemRender(item, index) {
		var _this = this;

		if (item.data) {
			try {
				if (item.data[0] == '[' && item.data[item.data.length - 1] == ']') {
					item.data = JSON.parse(item.data);
				} else if (item.data.indexOf(' ') != -1) {
					item.data = item.data.split(' ');
				}
			} catch (e) {
				console.error(e);
			}
		}
		if (item.attrs) {
			item.attrs = JSON.parse(item.attrs);
		}
		if (item.props) {
			zn.extend(item, JSON.parse(item.props));
		}
		item.type = item.type.split('_')[0];
		return React.createElement(
			'li',
			{ className: 'field' },
			React.createElement(zn.react.FormItem, _extends({}, item, { className: 'column' })),
			React.createElement(
				'div',
				{ className: 'action' },
				index != 0 && React.createElement('i', { onClick: function onClick() {
						return _this.__upItem(item);
					}, 'data-tooltip': '\u4E0A\u79FB', className: 'fa fa-angle-up' }),
				index != this.state.fields.length - 1 && React.createElement('i', { onClick: function onClick() {
						return _this.__downItem(item);
					}, 'data-tooltip': '\u4E0B\u79FB', className: 'fa fa-angle-down' }),
				React.createElement('i', { onClick: function onClick() {
						return _this.__updateItem(item);
					}, 'data-tooltip': '\u4FEE\u6539\u5B57\u6BB5', className: 'fa fa-edit' }),
				React.createElement('i', { onClick: function onClick() {
						return _this.__removeItem(item);
					}, 'data-tooltip': '\u5220\u9664\u5B57\u6BB5', className: 'fa fa-remove', style: { color: 'red' } })
			)
		);
	},
	render: function render() {
		var _this2 = this;

		return React.createElement(
			zn.react.Page,
			{ className: 'zn-plugin-survey-event-info', title: '\u6D3B\u52A8\u8BE6\u60C5' },
			this.state.event && React.createElement(
				'div',
				{ className: 'inner info' },
				!!this.state.event.status && React.createElement(
					'div',
					{ className: 'inner-left qr-code', style: { width: 138 } },
					React.createElement(QRCode, { value: window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginsurvey.event.submit?znid=" + this.state.event.zn_id }),
					React.createElement(
						'a',
						{ className: 'btn', onClick: function onClick() {
								return zn.react.copyToClipboard(window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginsurvey.event.submit?znid=" + _this2.state.event.zn_id);
							} },
						React.createElement('i', { className: 'fa fa-copy' }),
						'\u590D\u5236\u94FE\u63A5'
					)
				),
				React.createElement(
					'div',
					{ className: 'inner-right base-items' },
					React.createElement(
						'div',
						{ className: 'r-header' },
						React.createElement(
							'span',
							{ className: 'name' },
							this.state.event.zn_title
						),
						React.createElement(
							'span',
							{ className: 'h-tag zr-fr' },
							'\u6700\u8FD1\u4E00\u6B21\u62A5\u540D\u65F6\u95F4\uFF1A',
							this.state.event.zn_modify_time
						)
					),
					React.createElement(
						'div',
						{ className: 'r-item' },
						React.createElement(
							'span',
							{ className: '_key' },
							'\u5F53\u524D\u8FDB\u5EA6'
						),
						React.createElement(
							'span',
							{ className: 'h-tag' },
							this.state.event.count,
							' / ',
							this.state.event.max_count
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
							(this.state.event.start_time || '').toString().split(' ')[0],
							' ~ ',
							(this.state.event.end_time || '').toString().split(' ')[0]
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
							this.state.event.zn_create_time
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
							this.state.event.comment
						)
					)
				)
			),
			this.state.event && React.createElement(
				'div',
				{ className: 'event-fields', style: { color: this.state.event.text_color } },
				this.state.event.background_image && React.createElement('img', { className: 'background-image', src: this.state.event.background_image }),
				React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(zn.react.Button, { onClick: this.__addItem, text: '\u6DFB\u52A0\u5B57\u6BB5', status: 'warning', icon: 'fa-plus' }),
					!!this.state.fields.length ? React.createElement(
						'ul',
						{ className: 'fields' },
						this.state.fields.map(this.__itemRender)
					) : React.createElement(
						'span',
						{ className: 'zr-tip' },
						'\u6682\u65F6\u6CA1\u6709\u5B57\u6BB5'
					)
				)
			)
		);
	}
});