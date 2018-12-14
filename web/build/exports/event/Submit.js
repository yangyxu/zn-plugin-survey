var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var _openid = null;
		if (zn.plugin.wechat) {
			_openid = zn.plugin.wechat.getToken().openid;
		} else {
			_openid = localStorage.getItem('openid');
			if (!_openid) {
				_openid = zn.uuid();
				localStorage.setItem('openid', _openid);
			}
		}
		return {
			submited: false,
			openid: _openid,
			event: null,
			fields: null,
			error: null,
			data: null
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
			openid: this.state.openid
		}).then(function (data) {
			if (data.status == 200) {
				var _data = data.result;
				if (_data.fields) {
					_data.fields = _data.fields.map(function (item, index) {
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
						item.type = item.type.split('_')[0];
						return item;
					});
				}

				window.document.title = _data.event.zn_title;
				this.setState({
					event: _data.event,
					fields: _data.fields,
					error: _data.error,
					data: _data.data
				});
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
	__renderError: function __renderError(error) {
		return React.createElement(
			'div',
			{ className: 'submit-error' },
			React.createElement(
				'div',
				null,
				React.createElement('i', { className: 'fa fa-frown-o' })
			),
			React.createElement('div', { dangerouslySetInnerHTML: { __html: error } })
		);
	},
	__onSubmit: function __onSubmit(data) {
		zn.preloader.open({
			content: '提交中...'
		});
		/*
  for(var key in data){
  	if(!isNaN(data[key])){
  		data[key] = new Number(data[key]).toPrecision(100).split('.')[0];
  	}
  }*/
		zn.confirm('确认提交报名吗？', '提示', function () {
			zn.http.post('/zn.plugin.survey/event/submitEvent', {
				event_uuid: this.props.request.search.znid,
				openid: this.state.openid,
				data: data
			}).then(function (data) {
				zn.preloader.close();
				if (data.status == 200) {
					this.state.submited = true;
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
		var _this = this;

		return React.createElement(
			'div',
			{ className: 'submit-form' },
			!!this.state.event.show_count && React.createElement(
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
				className: 'form',
				itemClassName: 'column',
				action: '/zn.plugin.survey/event/submitEvent',
				items: this.state.fields,
				onSubmitBefore: this.__onSubmit,
				buttons: [] }),
			React.createElement(zn.react.Button, { onClick: function onClick() {
					return _this.refs.form.submit();
				}, className: 'submit-btn', text: '\u63D0\u4EA4\u8868\u5355', icon: 'fa-pencil', status: 'warning' })
		);
	},
	__renderResult: function __renderResult() {
		return React.createElement(
			'div',
			{ className: 'submit-form' },
			React.createElement(
				'div',
				{ className: 'success-tip', style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'left' } },
				React.createElement('i', { className: 'fa fa-smile-o zr-padding-3' }),
				React.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.event.success_message } })
			),
			!!this.state.event.show_count && React.createElement(
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
		var _this2 = this;

		if (this.state.error) {
			return this.__renderError(this.state.error);
		}
		if (this.state.data) {
			if (this.state.event.unique_check) {
				return this.__renderResult();
			} else {
				if (this.state.submited) {
					return React.createElement(
						'div',
						null,
						React.createElement(
							'div',
							{ className: 'success-tip', style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'left' } },
							React.createElement('i', { className: 'fa fa-smile-o zr-padding-3' }),
							React.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.event.success_message } })
						),
						React.createElement(zn.react.Button, { onClick: function onClick() {
								return _this2.setState({ submited: false });
							}, text: '\u8FD4\u56DE(BACK)', icon: 'fa-angle-left', status: 'warning' })
					);
				} else {
					return this.__renderForm();
				}
			}
		} else if (this.state.event) {
			return this.__renderForm();
		}

		return React.createElement(zn.react.DataLoader, { content: '\u52A0\u8F7D\u6570\u636E\u4E2D...', loader: 'timer' });
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'zn-plugin-survey-event-submit', style: { color: this.state.event ? this.state.event.text_color : null } },
			this.state.event && React.createElement('img', { className: 'inner-bg', src: zn.http.fixURL(this.state.event.background_image) }),
			React.createElement(
				'div',
				{ className: 'inner-content' },
				this.state.event && React.createElement(
					'div',
					{ className: 'inner-title' },
					this.state.event.zn_title
				),
				this.__renderContent(),
				this.state.event && React.createElement(
					'div',
					{ className: 'footer-title' },
					this.state.event.footer_title
				)
			)
		);
	}
});