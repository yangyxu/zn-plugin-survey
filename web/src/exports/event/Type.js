var React = require('react');
var EventList = require('./List.js');


module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			model: 'ZNPluginSurveyEventType',
			pid: 0,
			title: '活动类型管理',
			fields: [
				{ title: '类型名称', type: 'Input', name: 'zn_title' },
				{ title: '表前缀', type: 'Input', name: 'table_prefix', value: 'zn_plugin_survey_event_table_' },
				{ title: '是否启用权限', type: 'Radio', name: 'zn_rights_enabled', value: 0,
					data: [
						{ text: '禁止', value: 0 },
						{ text: '启用', value: 1 }
					]
				},
				{ title: '拥有者', type: zn.plugin.admin.UserSelector, mulitable: false, name: 'zn_rights_owner_id' },
				{ title: '操作用户', type: zn.plugin.admin.UserSelector, mulitable: true, name: 'zn_rights_users' },
				{ title: '查看用户', type: zn.plugin.admin.UserSelector, mulitable: true, name: 'zn_rights_observe_users' },
				{ title: '操作角色', type: zn.plugin.admin.RoleSelector, name: 'zn_rights_roles' },
				{ title: '查看角色', type: zn.plugin.admin.RoleSelector, name: 'zn_rights_observe_roles' },
				{ title: '扩展', type: 'Textarea', name: 'zn_tree_extend' }
			]
		};
	},
	__rightRender: function (data){
		return <EventList data={data} />;
	},
	render:function(){
		return (
			<zn.plugin.admin.TreeModelView {...this.props} emptyRender={()=><EventList />} rightRender={this.__rightRender} leftWidth={160} />
		);
	}
});
