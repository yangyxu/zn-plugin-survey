"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      model: 'ZNPluginSurveyEvent',
      status: 100,
      data: zn.store.post('/zn.plugin.survey/event/getEventsByType', {
        type: this.props.type ? this.props.type : null
      }),
      formItems: [{
        title: '活动名称',
        name: 'zn_title',
        type: 'Input',
        required: true,
        error: '名称必填项!'
      }, {
        title: '最大限制',
        name: 'max_count',
        type: 'Input',
        attrs: {
          type: 'number'
        }
      }, {
        title: '显示余量',
        name: 'show_count',
        type: 'Radio',
        value: 0,
        data: [{
          value: 0,
          text: '否'
        }, {
          value: 1,
          text: '是'
        }]
      }, {
        title: '唯一性验证',
        name: 'unique_check',
        type: 'Radio',
        value: 0,
        data: [{
          value: 0,
          text: '否'
        }, {
          value: 1,
          text: '是'
        }]
      }, {
        title: '发送邮件',
        name: 'email_enabled',
        type: 'Radio',
        value: 0,
        data: [{
          value: 0,
          text: '否'
        }, {
          value: 1,
          text: '是'
        }]
      }, {
        title: '开始时间',
        name: 'start_time',
        type: 'DateTime',
        attrs: {
          type: 'date'
        },
        required: true
      }, {
        title: '结束时间',
        name: 'end_time',
        type: 'DateTime',
        attrs: {
          type: 'date'
        },
        required: true
      }, {
        title: '成功消息',
        name: 'success_message',
        type: 'RichEditor'
      }, {
        title: '失败消息',
        name: 'error_message',
        type: 'RichEditor'
      }, {
        title: '背景图片',
        name: 'background_image',
        type: 'ImageUploader'
      }, {
        title: '页脚标题',
        name: 'footer_title',
        type: 'Textarea'
      }, {
        title: '文字颜色',
        type: zn.plugin.admin.ColorPicker,
        name: 'text_color'
      }, {
        title: '附件',
        name: 'attachments',
        type: 'FileUploader'
      }, {
        title: '备注',
        name: 'comment',
        type: 'Textarea'
      }, {
        title: '说明',
        name: 'zn_note',
        type: 'Textarea'
      }],
      toolbarItems: [{
        text: '创建活动',
        name: 'add',
        icon: 'fa-plus',
        style: {
          marginRight: 8
        }
      } //{ text: '删除', name: 'remove', status: 'danger', icon: 'fa-remove', style: { marginRight: 5 } }
      ]
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.type != this.props.type) {
      this.state.data._data.type = nextProps.type;
      this.state.data.refresh();
    }
  },
  __onStatusChange: function __onStatusChange(value) {
    this.setState({
      status: value.value
    });

    if (value.value == 100) {
      this.state.data._data.status = null;
      delete this.state.data._data.status;
    } else {
      this.state.data._data.status = value.value;
    }

    this.state.data.refresh();
  },
  __renderStatus: function __renderStatus(status) {
    switch (status) {
      case 0:
        return React.createElement("span", null, "\u5F85\u53D1\u5E03");

      case 1:
        return React.createElement("span", {
          style: {
            color: 'green'
          }
        }, "\u5DF2\u53D1\u5E03");

      case -1:
        return React.createElement("span", {
          style: {
            color: 'red'
          }
        }, "\u5DF2\u7ED3\u675F");
    }
  },
  __viewEventChart: function __viewEventChart(item) {
    zn.react.session.relativeJump('/znpluginsurvey.event.result', {
      event_uuid: item.zn_id
    });
  },
  __onItemRender: function __onItemRender(item) {
    var _this = this;

    return React.createElement("div", {
      className: "inner"
    }, React.createElement("div", {
      className: "inner-left",
      style: {
        width: 80
      }
    }, React.createElement(zn.react.ProgressRing, {
      key: item.count / item.max_count * 100,
      style: {
        margin: "0 auto"
      },
      full: false,
      value: (item.count / item.max_count * 100).toFixed(1)
    }), !(item.status == 0) ? React.createElement("span", {
      onClick: function onClick() {
        return _this.__viewEventChart(item);
      },
      className: "btn"
    }, React.createElement("i", {
      className: "fa fa-pie-chart zr-padding-3"
    }), "\u67E5\u770B\u62A5\u8868") : React.createElement("span", null)), React.createElement("div", {
      className: "inner-right"
    }, React.createElement("div", {
      className: "r-header"
    }, React.createElement("span", {
      className: "name",
      onClick: function onClick() {
        return zn.react.session.relativeJump('/znpluginsurvey.event.info', {
          znid: item.zn_id
        });
      }
    }, item.zn_title)), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u5F53\u524D\u8FDB\u5EA6"), React.createElement("span", {
      className: "h-tag"
    }, React.createElement("strong", {
      style: {
        color: '#800010'
      },
      "data-tooltip": item.zn_modify_time ? '最近一次报名时间：' + item.zn_modify_time : ''
    }, item.count), " / ", item.max_count)), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u9884\u8BA1\u5468\u671F\uFF1A"), React.createElement("span", {
      className: "_value"
    }, (item.start_time || '').toString().split(' ')[0], " ~ ", (item.end_time || '').toString().split(' ')[0])), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u521B\u5EFA\u65F6\u95F4\uFF1A"), React.createElement("span", {
      className: "_value"
    }, item.zn_create_time)), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "h-tag zr-fl"
    }, !!(item.status == 0) ? React.createElement("i", {
      "data-tooltip": "\u90E8\u7F72",
      onClick: function onClick() {
        return _this.__deployItem(item);
      },
      className: "fa fa-telegram zr-padding-3"
    }) : React.createElement("i", {
      "data-tooltip": "\u91CD\u65B0\u53D1\u5E03",
      onClick: function onClick() {
        return _this.__deployItem(item);
      },
      className: "fa fa-telegram zr-padding-3"
    }), this.__renderStatus(item.status)), React.createElement("i", {
      onClick: function onClick() {
        return _this.__removeItem(item);
      },
      style: {
        color: '#d9534f'
      },
      className: "fa fa-remove zr-fr zr-padding-3 zr-margin-3"
    }, "\u5220\u9664"), React.createElement("i", {
      onClick: function onClick() {
        return _this.__updateItem(item);
      },
      style: {
        color: '#9b59b6'
      },
      className: "fa fa-edit zr-fr zr-padding-3 zr-margin-3"
    }, "\u4FEE\u6539"), !(item.status == 0) && React.createElement("i", {
      style: {
        color: '#9b59b6'
      },
      onClick: function onClick() {
        return zn.react.downloadURL(zn.http.fixURL('/zn.plugin.survey/event/downloadEventResult') + "?event_uuid=" + item.zn_id);
      },
      className: "fa zr-fr fa-download zr-padding-3 zr-margin-3"
    }, "\u5BFC\u51FA\u4E3AExcel"))));
  },
  __doSuccess: function __doSuccess() {
    this.state.data.refresh();
  },
  __addItem: function __addItem() {
    zn.dialog({
      title: '创建活动',
      content: React.createElement(zn.react.Form, {
        action: "/zn.plugin.survey/event/create",
        merge: "values",
        hiddens: {
          zn_id: zn.uuid(),
          type_id: this.props.type
        },
        exts: {
          model: this.state.model
        },
        onSubmitSuccess: this.__doSuccess,
        items: this.state.formItems
      })
    });
  },
  __updateItem: function __updateItem(data) {
    zn.dialog({
      title: '修改活动信息',
      content: React.createElement(zn.react.Form, {
        merge: "updates",
        action: "/zn.plugin.admin/model/update",
        exts: {
          model: this.state.model,
          where: {
            id: data.id
          }
        },
        value: zn.store.post('/zn.plugin.admin/model/selectOne', {
          model: this.state.model,
          where: {
            id: data.id
          }
        }),
        onSubmitSuccess: this.__doSuccess,
        items: this.state.formItems
      })
    });
  },
  __deployItem: function __deployItem(item) {
    zn.confirm('确认发布该活动？', '提示', function () {
      zn.http.post('/zn.plugin.survey/event/deployEvent', {
        event_id: item.id
      }).then(function (data) {
        if (data.status == 200) {
          zn.notification.success('发布成功');

          this.__doSuccess();
        } else {
          zn.notification.error(data.result);
        }
      }.bind(this), function (data) {
        zn.notification.error("网络请求失败");
      });
    }.bind(this));
  },
  __removeItem: function __removeItem(item) {
    var _self = this;

    zn.confirm('确认删除活动【' + item.zn_title + '】吗？', '提示', function () {
      zn.preloader.open({
        content: '删除中...'
      });
      zn.http.post('/zn.plugin.admin/model/delete', {
        model: this.state.model,
        where: {
          zn_id: item.zn_id
        }
      }).then(function (data) {
        if (data.status == 200) {
          zn.toast.success('删除成功');

          _self.state.data.refresh();
        } else {
          zn.toast.error(data.result);
        }

        zn.preloader.close();
      }, function (data) {
        zn.toast.error("网络请求失败");
        zn.preloader.close();
      });
    }.bind(this));
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
    return React.createElement(zn.react.Page, {
      canBack: this.props.canBack || false,
      className: "zn-plugin-survey-list-view",
      title: "\u6D3B\u52A8\u5217\u8868",
      toolbarItems: this.props.type ? this.state.toolbarItems : [],
      onToolbarClick: this.__onToolbarClick,
      headerCenter: React.createElement(zn.react.ListView, {
        className: "zr-tab-ios",
        selectMode: "radio",
        valueKey: "status",
        onClick: this.__onStatusChange,
        value: this.state.status,
        data: [{
          status: 100,
          icon: 'fa-th-list',
          text: '全部活动'
        }, {
          status: 0,
          icon: 'fa-edit',
          text: '待发布'
        }, {
          status: 1,
          icon: 'fa-link',
          text: '已发布'
        }, {
          status: -1,
          icon: 'fa-check-circle',
          text: '已结束'
        }]
      })
    }, React.createElement(zn.react.PagerView, {
      view: "ListView",
      viewClassName: "projects",
      data: this.state.data,
      itemRender: this.__onItemRender
    }));
  }
});