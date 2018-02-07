var React = require('react');
var QRCode = require('qrcode.react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			event: null,
			fields: [],
			formItems: [
				{ title: '标题', name: 'title', type: 'Input', required: true, error: '必填项!' },
				{
					title: '是否必填字段',
					name: 'required',
					type: 'Radio',
					value: 0,
					data: [
						{ text: '否', value: 0 },
						{ text: '是', value: 1 }
					]
				},
				{
					title: '类型',
					name: 'type',
					type: 'Select',
					data: [
						{ text: '组标题', value: 'FormTitle' },
						{ text: '单行输入框', value: 'Input' },
						{ text: '数字框', value: 'Input_number' },
						{ text: '日期框', value: 'Input_date' },
						{ text: '时间框', value: 'DateTime' },
						{ text: '组合框', value: 'MultiInput' },
						{ text: '选择框', value: 'Select' },
						{ text: '单图片', value: 'ImageUploader' },
						{ text: '多文件', value: 'FileUploader' },
						{ text: '是否框', value: 'Checkbox' },
						{ text: '多选框', value: 'CheckboxGroup' },
						{ text: '单选框', value: 'Radio' },
						{ text: '多行输入框', value: 'Textarea' }
					],
					onChange: function (data, item, select){
						if(data){
							if(data.value.indexOf('Input_')!=-1){
								select.props.form.state.hiddens.attrs = JSON.stringify({
									type: data.value.split('_')[1]
								});
							}
						}
					}
				},
				{ title: '数据源', name: 'data', type: 'Textarea' },
				{ title: '字段说明', name: 'zn_note', type: 'Textarea' }
			],
			toolbarItems: [
				{ text: '添加字段', name: 'add', icon: 'fa-plus', style: { marginRight: 5 } }
			]
		}
	},
	componentDidMount: function (){
		this.__loadMeta();
	},
	__loadMeta: function (){
		zn.preloader.open({
			content: '加载中...'
		});
		zn.http.post('/zn.plugin.survey/event/getEventFields', {
			event_uuid: this.props.request.search.znid
		}).then(function (data){
			if(data.status==200){
				this.setState(data.result);
			}else {
				zn.notification.error(data.result);
			}
			zn.preloader.close();
		}.bind(this), function (error){
			zn.notification.error('请求网络失败');
			zn.preloader.close();
		});
	},
	__onAddSubmitBefore: function (data){
		for(var key in data){
			if(key.indexOf('.')!=-1){
				var _value = data[key],
					_keys = key.split('.');
				if(!data[_keys[0]]){
					data[_keys[0]] = {};
				}
				data[_keys[0]][_keys[1]] = _value;
				data[key] = null;
				delete data[key];
			}
		}
		zn.http.post('/zn.plugin.survey/event/createEventField', data)
			.then(function (data){
				if(data.status==200){
					this.__loadMeta();
				}else {
					zn.notification.error(data.result);
				}
			}.bind(this), function (err){
				zn.notification.error('网络请求失败');
			}.bind(this))
		return false;
	},
	__addItem: function (){
		zn.dialog({
			title: '添加字段',
			content: <zn.react.Form
						hiddens={{zn_id: zn.uuid(), event_id: this.state.event.id, field_order: (this.state.fields.length + 1) }}
						onSubmitBefore={this.__onAddSubmitBefore}
						items={this.state.formItems} />
		});
	},
	__updateItem: function (data){
		zn.dialog({
			title: '更新字段',
			content: <zn.react.Form
				merge="updates"
				action='/zn.plugin.admin/model/update'
				exts={{ model: 'ZNPluginSurveyEventField', where: {id: data.id} }}
				value={zn.store.post('/zn.plugin.admin/model/selectOne', { model: 'ZNPluginSurveyEventField', where: {id: data.id} })}
				onSubmitSuccess={this.__loadMeta}
				items={this.state.formItems} />
		});
	},
	__removeItem: function (item){
		zn.confirm('确认删除这个字段吗？', '提示', function () {
			zn.http.post('/zn.plugin.admin/model/delete', {
				model: 'ZNPluginSurveyEventField',
				where: {
					id: item.id
				}
			}).then(function (data){
				if(data.status==200){
					zn.notification.success('删除成功');
					this.__loadMeta();
				}else {
					zn.notification.error(data.result);
				}
			}.bind(this), function (data){
				zn.notification.error("网络请求失败");
			});
		}.bind(this));
	},
	__itemRender: function (item){
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
		if(item.props){
			zn.extend(item, JSON.parse(item.props));
		}
		item.type = item.type.split('_')[0];
		return <li className="field">
			<zn.react.FormItem {...item} className="column" />
			<div className="action">
				<i onClick={()=>this.__updateItem(item)} data-tooltip="修改字段" className="fa fa-edit" />
				<i onClick={()=>this.__removeItem(item)} data-tooltip="删除字段" className="fa fa-remove" style={{color: 'red'}} />
			</div>
		</li>;
	},
	render:function(){
		return (
			<zn.react.Page className="zn-plugin-survey-event-info" title="活动详情" >
				{
					this.state.event && <div className="inner info">
						{
							!!this.state.event.status && <div className="inner-left qr-code" style={{width: 138}}>
								<QRCode value={window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginsurvey.event.submit?znid="+this.state.event.zn_id} />
								<a className="btn" onClick={()=>zn.react.copyToClipboard(window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginsurvey.event.submit?znid="+this.state.event.zn_id)}><i className="fa fa-copy" />复制链接</a>
							</div>
						}
						<div className="inner-right base-items">
							<div className="r-header">
								<span className="name">{this.state.event.zn_title}</span>
								<span className="h-tag zr-fr">最近一次报名时间：{this.state.event.zn_modify_time}</span>
							</div>
							<div className="r-item">
								<span className="_key">当前进度</span>
								<span className="h-tag">{this.state.event.count} / {this.state.event.max_count}</span>
							</div>
							<div className="r-item">
								<span className="_key">预计周期：</span>
								<span className="_value">{(this.state.event.start_time||'').toString().split(' ')[0]} ~ {(this.state.event.end_time||'').toString().split(' ')[0]}</span>
							</div>
							<div className="r-item">
								<span className="_key">创建时间：</span>
								<span className="_value">{this.state.event.zn_create_time}</span>
							</div>
							<div className="r-item">
								<span className="_key">备注：</span>
								<span className="_value">{this.state.event.comment}</span>
							</div>
						</div>
					</div>
				}
				{
					this.state.event && <div className="event-fields">
						{
							this.state.event.background_image && <img className="background-image" src={this.state.event.background_image} />
						}
						<div className="content">
							<zn.react.Button onClick={this.__addItem} text="添加字段" status="warning" icon="fa-plus" />
							{
								!!this.state.fields.length ? <ul className="fields">
									{
										this.state.fields.map(this.__itemRender)
									}
								</ul> : <span className="zr-tip">暂时没有字段</span>
							}
						</div>
					</div>
				}
			</zn.react.Page>
		);
	}
});
