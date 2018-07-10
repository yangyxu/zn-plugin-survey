var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		var _openid = null;
		if(zn.plugin.wechat){
			_openid = zn.plugin.wechat.getToken().openid;
		}else {
			_openid = localStorage.getItem('openid');
			if(!_openid){
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
		}
	},
	componentDidMount: function (){
		this.__loadMeta();
	},
	__loadMeta: function (){
		zn.preloader.open({
			content: '加载中...'
		});
		zn.http.post('/zn.plugin.survey/event/getEventMeta', {
			event_uuid: this.props.request.search.znid,
			openid: this.state.openid
		}).then(function (data){
			if(data.status==200){
				var _data = data.result;
				if(_data.fields){
					_data.fields = _data.fields.map(function (item, index){
						if(item.data){
							try {
								if(item.data[0] == '[' && item.data[item.data.length-1] == ']'){
									item.data = JSON.parse(item.data);
								}else if(item.data.indexOf(' ')!=-1) {
									item.data = item.data.split(' ');
								}
							} catch (e) {
								console.error(e);
							}
						}
						if(item.attrs){
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
			}else {
				this.setState({
					error: data.result
				});
			}
			zn.preloader.close();
		}.bind(this), function (error){
			zn.toast.error('请求网络失败');
			zn.preloader.close();
		});
	},
	__renderError: function (error){
		return (
			<div className="submit-error">
				<div><i className="fa fa-check" /></div>
				<div>{error}</div>
			</div>
		);
	},
	__onSubmit: function (data){
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
			}).then(function (data){
				zn.preloader.close();
				if(data.status==200){
					this.state.submited = true;
					this.__loadMeta();
				}else {
					zn.toast.error(data.result);
				}
			}.bind(this), function (data){
				zn.toast.error('网络请求失败');
				zn.preloader.close();
			});
		}.bind(this));
		return false;
	},
	__renderForm: function (){
		return (
			<div className="submit-form">
				{!!this.state.event.show_count && <div className="count-info">还剩<span className="count">{this.state.event.max_count - this.state.event.count}</span>个名额</div>}
				<zn.react.Form
					ref="form"
					merge="data"
					className="form"
					itemClassName="column"
					action='/zn.plugin.survey/event/submitEvent'
					items={this.state.fields}
					onSubmitBefore={this.__onSubmit}
					buttons={[]} />
				<zn.react.Button onClick={()=>this.refs.form.submit()} className="submit-btn" text="提交表单" icon="fa-pencil" status="warning" />
			</div>
		);
	},
	__renderResult: function (){
		return (
			<div className="submit-form">
				<div className="success-tip" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'left' }}>
					<i className="fa fa-check zr-padding-3" style={{fontSize: 32}} />
					<div dangerouslySetInnerHTML={{__html: this.state.event.success_message}} />
				</div>
				{!!this.state.event.show_count && <div className="count-info">还剩<span className="count">{this.state.event.max_count - this.state.event.count}</span>个名额</div>}
				<ul className="field-value">
					{
						this.state.data.map(function (item, index){
							return (
								<li className="field-item">
									<span className="fi-title">{item.title}</span>
									<span className="fi-value">{item.value}</span>
								</li>
							);
						})
					}
				</ul>
			</div>
		);
	},
	__renderContent: function (){
		if(this.state.error){
			return this.__renderError(this.state.error);
		}
		if(this.state.data){
			if(this.state.event.unique_check){
				return this.__renderResult();
			}else {
				if(this.state.submited){
					return <div>
						<div className="success-tip" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'left' }}>
							<i className="fa fa-check zr-padding-3" style={{fontSize: 32}} />
							<div dangerouslySetInnerHTML={{__html: this.state.event.success_message}} />
						</div>
						<zn.react.Button onClick={()=>this.setState({ submited: false })} text="返回(BACK)" icon="fa-angle-left" status="warning" />
					</div>
				}else {
					return this.__renderForm();
				}
			}
		}else if(this.state.event){
			return this.__renderForm();
		}

		return <zn.react.DataLoader content="加载数据中..." loader="timer" />;
	},
	render:function(){
		return (
			<div className="zn-plugin-survey-event-submit"  style={{color: this.state.event ? this.state.event.text_color : null}}>

				{
					this.state.event && <img className="inner-bg" src={zn.http.fixURL(this.state.event.background_image)} />
				}
				<div className="inner-content">
					{
						this.state.event && <div className="inner-title">{this.state.event.zn_title}</div>
					}
					{this.__renderContent()}
					{this.state.event && <div className="footer-title">{this.state.event.footer_title}</div>}
				</div>
			</div>
		);
	}
});
