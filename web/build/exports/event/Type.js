var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var EventList = require('../../component/EventList.js');

module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: 'ZNPluginSurveyEventType',
			pid: 0,
			title: '活动类型管理',
			fields: [{ title: '类型名称', type: 'Input', name: 'zn_title' }, { title: '表前缀', type: 'Input', name: 'table_prefix', value: 'zn_plugin_survey_event_table_' }, { title: '是否启用权限', type: 'Radio', name: 'zn_rights_enabled', value: 0,
				data: [{ text: '禁止', value: 0 }, { text: '启用', value: 1 }]
			}, { title: '拥有者', type: zn.plugin.admin.UserSelector, mulitable: false, name: 'zn_rights_owner_id' }, { title: '操作用户', type: zn.plugin.admin.UserSelector, mulitable: true, name: 'zn_rights_users' }, { title: '查看用户', type: zn.plugin.admin.UserSelector, mulitable: true, name: 'zn_rights_observe_users' }, { title: '操作角色', type: zn.plugin.admin.RoleSelector, name: 'zn_rights_roles' }, { title: '查看角色', type: zn.plugin.admin.RoleSelector, name: 'zn_rights_observe_roles' }, { title: '扩展', type: 'Textarea', name: 'zn_tree_extend' }]
		};
	},
	__rightRender: function __rightRender(data) {
		return React.createElement(EventList, { type: data.value });
	},
	render: function render() {
		return React.createElement(zn.plugin.admin.TreeModelView, _extends({}, this.props, { emptyRender: function emptyRender() {
				return React.createElement(EventList, null);
			}, rightRender: this.__rightRender, leftWidth: 160 }));
	}
});