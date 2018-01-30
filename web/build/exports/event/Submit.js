var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			event: null,
			fields: null,
			error: null,
			data: null,
			toolbarItems: [{ text: '提交报名', name: 'submit', icon: 'fa-hand-pointer-o' }]
		};
	},
	componentDidMount: function componentDidMount() {
		this.__loadMeta();
	},
	__loadMeta: function __loadMeta() {
		zn.preloader.open({
			content: '加载中...'
		});
		zn.http.post('/zn.plugin.survey/event/getEventMeta', {
			event_uuid: this.props.request.search.znid,
			openid: zn.plugin.wechat.getToken().openid
		}).then(function (data) {
			if (data.status == 200) {
				var _data = data.result;
				if (_data.fields) {
					_data.fields = _data.fields.map(function (item, index) {
						if (item.data) {
							item.data = eval(item.data);
						}
						return item;
					});
				}
				window.document.title = _data.event.zn_title;
				this.setState(_data);
			} else {
				this.setState({
					error: data.result
				});
			}
			zn.preloader.close();
		}.bind(this), function (error) {
			zn.toast.error('请求网络失败');
			zn.preloader.close();
		});
	},
	__onToolbarClick: function __onToolbarClick(item) {
		switch (item.name) {
			case 'submit':
				this.refs.form.submit();
				break;
		}
	},
	__renderError: function __renderError(error) {
		return React.createElement(
			'div',
			{ className: 'submit-error' },
			React.createElement(
				'div',
				null,
				React.createElement('i', { className: 'fa fa-check' })
			),
			React.createElement(
				'div',
				null,
				error
			)
		);
	},
	__onSubmit: function __onSubmit(data) {
		zn.preloader.open({
			content: '提交中...'
		});
		zn.confirm('确认提交报名吗？', '提示', function () {
			zn.http.post('/zn.plugin.survey/event/submitEvent', {
				event_uuid: this.props.request.search.znid,
				openid: zn.plugin.wechat.getToken().openid,
				data: data
			}).then(function (data) {
				zn.preloader.close();
				if (data.status == 200) {
					this.__loadMeta();
				} else {
					zn.toast.error(data.result);
				}
			}.bind(this), function (data) {
				zn.toast.error('网络请求失败');
				zn.preloader.close();
			});
		}.bind(this));
		return false;
	},
	__renderForm: function __renderForm() {
		return React.createElement(
			'div',
			{ className: 'submit-form' },
			React.createElement(
				'div',
				{ className: 'count-info' },
				'\u8FD8\u5269',
				React.createElement(
					'span',
					{ className: 'count' },
					this.state.event.max_count - this.state.event.count
				),
				'\u4E2A\u540D\u989D'
			),
			React.createElement(zn.react.Form, {
				ref: 'form',
				merge: 'data',
				action: '/zn.plugin.survey/event/submitEvent',
				items: this.state.fields,
				onSubmitBefore: this.__onSubmit,
				buttons: [] })
		);
	},
	__renderResult: function __renderResult() {
		return React.createElement(
			'div',
			{ className: 'submit-form' },
			React.createElement(
				'div',
				{ className: 'count-info' },
				'\u8FD8\u5269',
				React.createElement(
					'span',
					{ className: 'count' },
					this.state.event.max_count - this.state.event.count
				),
				'\u4E2A\u540D\u989D'
			),
			React.createElement(
				'ul',
				{ className: 'field-value' },
				this.state.data.map(function (item, index) {
					return React.createElement(
						'li',
						{ className: 'field-item' },
						React.createElement(
							'span',
							{ className: 'fi-title' },
							item.title
						),
						React.createElement(
							'span',
							{ className: 'fi-value' },
							item.value
						)
					);
				})
			)
		);
	},
	__renderContent: function __renderContent() {
		if (this.state.error) {
			return this.__renderError(this.state.error);
		}
		if (this.state.fields) {
			return this.__renderForm();
		}
		if (this.state.data) {
			return this.__renderResult();
		}

		return React.createElement(zn.react.DataLoader, { content: '\u52A0\u8F7D\u6570\u636E\u4E2D...', loader: 'timer' });
	},
	render: function render() {
		return React.createElement(
			zn.react.Page,
			{ canBack: false, className: 'zn-plugin-survey-event-submit', title: this.state.event ? this.state.event.zn_title : '加载中...', toolbarItems: this.state.fields ? this.state.toolbarItems : [], onToolbarClick: this.__onToolbarClick },
			this.__renderContent()
		);
	}
});