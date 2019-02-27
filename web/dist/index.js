/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

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
        } //{ text: '删除', name: 'remove', status: 'danger', icon: 'fa-remove', style: { marginRight: 5 } }

      }]
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = zn.arrayValueToObject(['EventList'], function (value, index) {
  return __webpack_require__(11)("./" + value + ".js");
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = zn.arrayValueToObject(['Type', 'Result', 'Submit', 'Info', 'List'], function (value, index) {
  return __webpack_require__(14)("./" + value + ".js");
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	MODE_NUMBER :		1 << 0,
	MODE_ALPHA_NUM : 	1 << 1,
	MODE_8BIT_BYTE : 	1 << 2,
	MODE_KANJI :		1 << 3
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var math = __webpack_require__(7);

function QRPolynomial(num, shift) {

	if (num.length == undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] == 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= math.gexp(math.glog(this.get(i) ) + math.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = math.glog(this.get(0) ) - math.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var i = 0; i < e.getLength(); i++) {
			num[i] ^= math.gexp(math.glog(e.get(i) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = zn.arrayValueToObject(['Type', 'List', 'Info'], function (value, index) {
  return __webpack_require__(31)("./" + value + ".js");
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      model: 'ZNPluginSurveyPaper',
      status: 0,
      data: zn.store.post('/zn.plugin.survey/paper/getPapersByType', {
        type: this.props.data ? this.props.data.value : null,
        status: 0
      }),
      formItems: [{
        title: '问卷标题',
        name: 'zn_title',
        type: 'Input',
        required: true,
        error: '用户名必填项!'
      }, {
        title: '最大限制',
        name: 'max_count',
        type: 'Input',
        attrs: {
          type: 'number'
        }
      }, {
        title: '开始时间',
        name: 'start_time',
        type: 'Input',
        attrs: {
          type: 'date'
        }
      }, {
        title: '结束时间',
        name: 'end_time',
        type: 'Input',
        attrs: {
          type: 'date'
        }
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
        text: '添加',
        name: 'add',
        icon: 'fa-plus',
        style: {
          marginRight: 5
        }
      }]
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
        return React.createElement("span", null, "\u5F85\u53D1\u5E03");

      case 1:
        return React.createElement("span", null, "\u5DF2\u53D1\u5E03");

      case 2:
        return React.createElement("span", null, "\u5DF2\u7ED3\u675F");

      case -1:
        return React.createElement("span", null, "\u4E0B\u7EBF");
    }
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
      style: {
        padding: 10
      },
      full: false,
      value: 35
    })), React.createElement("div", {
      className: "inner-right"
    }, React.createElement("div", {
      className: "r-header"
    }, React.createElement("span", {
      className: "name",
      onClick: function onClick() {
        return zn.react.session.relativeJump('/znpluginsurvey.paper.info', {
          znid: item.zn_id
        });
      }
    }, item.zn_title), React.createElement("span", {
      className: "h-tag"
    }, this.__renderStatus(item.status)), React.createElement("i", {
      "data-tooltip": "\u4FEE\u6539\u4FE1\u606F",
      onClick: function onClick() {
        return _this.__updateItem(item);
      },
      className: "fa fa-edit h-btn"
    })), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u6700\u5927\u9650\u5236"), React.createElement("span", {
      className: "h-tag"
    }, item.max_count)), React.createElement("div", {
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
      className: "_key"
    }, "\u5907\u6CE8\uFF1A"), React.createElement("span", {
      className: "_value"
    }, item.comment))));
  },
  __doSuccess: function __doSuccess() {
    this.state.data.refresh();
  },
  __addItem: function __addItem() {
    zn.dialog({
      title: '新增问卷',
      content: React.createElement(zn.react.Form, {
        action: "/zn.plugin.admin/model/insert",
        merge: "values",
        hiddens: {
          zn_id: zn.uuid(),
          type_id: this.props.data.value
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
      title: '更新问卷',
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
    return React.createElement(zn.react.Page, {
      canBack: false,
      className: "zn-plugin-survey-list-view",
      title: "\u95EE\u5377\u5217\u8868",
      toolbarItems: this.props.data ? this.state.toolbarItems : [],
      onToolbarClick: this.__onToolbarClick,
      headerCenter: React.createElement(zn.react.ListView, {
        className: "zr-tab-ios",
        selectMode: "radio",
        valueKey: "status",
        onClick: this.__onStatusChange,
        value: this.state.status,
        data: [{
          status: 0,
          text: '待发布'
        }, {
          status: 1,
          text: '已发布'
        }, {
          status: 2,
          text: '已结束'
        }]
      })
    }, React.createElement(zn.react.PagerView, {
      view: "ListView",
      className: "projects",
      data: this.state.data,
      itemRender: this.__onItemRender
    }));
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

zn.plugin.survey = __webpack_require__(2);
module.exports = zn.react.extendPath('/znpluginsurvey.', __webpack_require__(12));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./EventList.js": 1,
	"./index.js": 2
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);

var _exports = {},
    _export = null;
var _data = {
  event: __webpack_require__(3),
  paper: __webpack_require__(8)
};
Object.keys(_data).map(function (path) {
  _export = _data[path];

  for (var key in _export) {
    _exports[(path + '.' + key).toLowerCase()] = _export[key];
  }
});
module.exports = _exports;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Info.js": 15,
	"./List.js": 26,
	"./Result.js": 27,
	"./Submit.js": 28,
	"./Type.js": 30,
	"./index.js": 3
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 14;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

__webpack_require__(16);

var React = __webpack_require__(0);

var QRCode = __webpack_require__(17);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      event: null,
      fields: [],
      formItems: [{
        title: '标题',
        name: 'title',
        type: 'Input',
        required: true,
        error: '必填项!'
      }, {
        title: '是否必填字段',
        name: 'required',
        type: 'Radio',
        value: 0,
        data: [{
          text: '否',
          value: 0
        }, {
          text: '是',
          value: 1
        }]
      }, {
        title: '类型',
        name: 'type',
        type: 'Select',
        data: [{
          text: '组标题',
          value: 'FormTitle'
        }, {
          text: '单行输入框',
          value: 'Input'
        }, {
          text: '数字框',
          value: 'Input_number'
        }, {
          text: '日期框',
          value: 'Input_date'
        }, {
          text: '时间框',
          value: 'DateTime'
        }, {
          text: '组合框',
          value: 'MultiInput'
        }, {
          text: '选择框',
          value: 'Select'
        }, {
          text: '单图片',
          value: 'ImageUploader'
        }, {
          text: '多文件',
          value: 'FileUploader'
        }, {
          text: '是否框',
          value: 'Checkbox'
        }, {
          text: '多选框',
          value: 'CheckboxGroup'
        }, {
          text: '单选框',
          value: 'Radio'
        }, {
          text: '多行输入框',
          value: 'Textarea'
        }],
        onChange: function onChange(data, item, select) {
          if (data) {
            if (data.value.indexOf('Input_') != -1) {
              select.props.form.state.hiddens.attrs = JSON.stringify({
                type: data.value.split('_')[1]
              });
            }
          }
        }
      }, {
        title: '数据源',
        name: 'data',
        type: 'Textarea'
      }, {
        title: '字段说明',
        name: 'zn_note',
        type: 'Textarea'
      }],
      toolbarItems: [{
        text: '添加字段',
        name: 'add',
        icon: 'fa-plus',
        style: {
          marginRight: 5
        }
      }]
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
        hiddens: {
          zn_id: zn.uuid(),
          event_id: this.state.event.id,
          field_order: this.state.fields.length + 1
        },
        onSubmitBefore: this.__onAddSubmitBefore,
        items: this.state.formItems
      })
    });
  },
  __updateItem: function __updateItem(data) {
    zn.dialog({
      title: '更新字段',
      content: React.createElement(zn.react.Form, {
        merge: "updates",
        action: "/zn.plugin.admin/model/update",
        exts: {
          model: 'ZNPluginSurveyEventField',
          where: {
            id: data.id
          }
        },
        value: zn.store.post('/zn.plugin.admin/model/selectOne', {
          model: 'ZNPluginSurveyEventField',
          where: {
            id: data.id
          }
        }),
        onSubmitSuccess: this.__loadMeta,
        items: this.state.formItems
      })
    });
  },
  __removeItem: function __removeItem(item) {
    zn.confirm('确认删除这个字段吗？', '提示', function () {
      zn.preloader.open({
        title: '删除中...'
      });
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
    zn.preloader.open({
      title: '升序中...'
    });
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
    zn.preloader.open({
      title: '降序中...'
    });
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
    return React.createElement("li", {
      className: "field"
    }, React.createElement(zn.react.FormItem, _extends({}, item, {
      className: "column"
    })), React.createElement("div", {
      className: "action"
    }, index != 0 && React.createElement("i", {
      onClick: function onClick() {
        return _this.__upItem(item);
      },
      "data-tooltip": "\u4E0A\u79FB",
      className: "fa fa-angle-up"
    }), index != this.state.fields.length - 1 && React.createElement("i", {
      onClick: function onClick() {
        return _this.__downItem(item);
      },
      "data-tooltip": "\u4E0B\u79FB",
      className: "fa fa-angle-down"
    }), React.createElement("i", {
      onClick: function onClick() {
        return _this.__updateItem(item);
      },
      "data-tooltip": "\u4FEE\u6539\u5B57\u6BB5",
      className: "fa fa-edit"
    }), React.createElement("i", {
      onClick: function onClick() {
        return _this.__removeItem(item);
      },
      "data-tooltip": "\u5220\u9664\u5B57\u6BB5",
      className: "fa fa-remove",
      style: {
        color: 'red'
      }
    })));
  },
  render: function render() {
    var _this2 = this;

    return React.createElement(zn.react.Page, {
      className: "zn-plugin-survey-event-info",
      title: "\u6D3B\u52A8\u8BE6\u60C5"
    }, this.state.event && React.createElement("div", {
      className: "inner info"
    }, !!this.state.event.status && React.createElement("div", {
      className: "inner-left qr-code",
      style: {
        width: 138
      }
    }, React.createElement(QRCode, {
      value: window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginsurvey.event.submit?znid=" + this.state.event.zn_id
    }), React.createElement("a", {
      className: "btn",
      onClick: function onClick() {
        return zn.react.copyToClipboard(window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginsurvey.event.submit?znid=" + _this2.state.event.zn_id);
      }
    }, React.createElement("i", {
      className: "fa fa-copy"
    }), "\u590D\u5236\u94FE\u63A5")), React.createElement("div", {
      className: "inner-right base-items"
    }, React.createElement("div", {
      className: "r-header"
    }, React.createElement("span", {
      className: "name"
    }, this.state.event.zn_title), React.createElement("span", {
      className: "h-tag zr-fr"
    }, "\u6700\u8FD1\u4E00\u6B21\u62A5\u540D\u65F6\u95F4\uFF1A", this.state.event.zn_modify_time)), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u5F53\u524D\u8FDB\u5EA6"), React.createElement("span", {
      className: "h-tag"
    }, this.state.event.count, " / ", this.state.event.max_count)), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u9884\u8BA1\u5468\u671F\uFF1A"), React.createElement("span", {
      className: "_value"
    }, (this.state.event.start_time || '').toString().split(' ')[0], " ~ ", (this.state.event.end_time || '').toString().split(' ')[0])), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u521B\u5EFA\u65F6\u95F4\uFF1A"), React.createElement("span", {
      className: "_value"
    }, this.state.event.zn_create_time)), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u5907\u6CE8\uFF1A"), React.createElement("span", {
      className: "_value"
    }, this.state.event.comment)))), this.state.event && React.createElement("div", {
      className: "event-fields",
      style: {
        color: this.state.event.text_color,
        width: 414,
        margin: '0 auto'
      }
    }, this.state.event.background_image && React.createElement("img", {
      className: "background-image",
      src: this.state.event.background_image
    }), React.createElement("div", {
      className: "content"
    }, React.createElement(zn.react.Button, {
      onClick: this.__addItem,
      text: "\u6DFB\u52A0\u5B57\u6BB5",
      status: "warning",
      icon: "fa-plus"
    }), !!this.state.fields.length ? React.createElement("ul", {
      className: "fields"
    }, this.state.fields.map(this.__itemRender)) : React.createElement("span", {
      className: "zr-tip"
    }, "\u6682\u65F6\u6CA1\u6709\u5B57\u6BB5"))));
  }
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var PropTypes = __webpack_require__(18);
// qr.js doesn't handle error level of zero (M) so we need to do it right,
// thus the deep require.
var QRCodeImpl = __webpack_require__(21);
var ErrorCorrectLevel = __webpack_require__(5);

function getBackingStorePixelRatio(ctx) {
  return (
    // $FlowFixMe
    ctx.webkitBackingStorePixelRatio ||
    // $FlowFixMe
    ctx.mozBackingStorePixelRatio ||
    // $FlowFixMe
    ctx.msBackingStorePixelRatio ||
    // $FlowFixMe
    ctx.oBackingStorePixelRatio ||
    // $FlowFixMe
    ctx.backingStorePixelRatio || 1
  );
}

var QRCode = function (_React$Component) {
  _inherits(QRCode, _React$Component);

  function QRCode() {
    _classCallCheck(this, QRCode);

    return _possibleConstructorReturn(this, (QRCode.__proto__ || Object.getPrototypeOf(QRCode)).apply(this, arguments));
  }

  _createClass(QRCode, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      return Object.keys(QRCode.propTypes).some(function (k) {
        return _this2.props[k] !== nextProps[k];
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      var _props = this.props,
          value = _props.value,
          size = _props.size,
          level = _props.level,
          bgColor = _props.bgColor,
          fgColor = _props.fgColor;

      // We'll use type===-1 to force QRCode to automatically pick the best type

      var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
      qrcode.addData(value);
      qrcode.make();

      if (this._canvas != null) {
        var canvas = this._canvas;

        var ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }
        var cells = qrcode.modules;
        if (cells === null) {
          return;
        }
        var tileW = size / cells.length;
        var tileH = size / cells.length;
        var scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
        canvas.height = canvas.width = size * scale;
        ctx.scale(scale, scale);

        cells.forEach(function (row, rdx) {
          row.forEach(function (cell, cdx) {
            ctx && (ctx.fillStyle = cell ? fgColor : bgColor);
            var w = Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW);
            var h = Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH);
            ctx && ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
          });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement('canvas', {
        style: { height: this.props.size, width: this.props.size },
        height: this.props.size,
        width: this.props.size,
        ref: function ref(_ref) {
          return _this3._canvas = _ref;
        }
      });
    }
  }]);

  return QRCode;
}(React.Component);

Object.defineProperty(QRCode, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    size: 128,
    level: 'L',
    bgColor: '#FFFFFF',
    fgColor: '#000000'
  }
});
Object.defineProperty(QRCode, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    value: PropTypes.string.isRequired,
    size: PropTypes.number,
    level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
    bgColor: PropTypes.string,
    fgColor: PropTypes.string
  }
});


module.exports = QRCode;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(19)();
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(20);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var BitByte = __webpack_require__(22);
var RSBlock = __webpack_require__(23);
var BitBuffer = __webpack_require__(24);
var util = __webpack_require__(25);
var Polynomial = __webpack_require__(6);

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

// for client side minification
var proto = QRCode.prototype;

proto.addData = function(data) {
	var newData = new BitByte(data);
	this.dataList.push(newData);
	this.dataCache = null;
};

proto.isDark = function(row, col) {
	if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
		throw new Error(row + "," + col);
	}
	return this.modules[row][col];
};

proto.getModuleCount = function() {
	return this.moduleCount;
};

proto.make = function() {
	// Calculate automatically typeNumber if provided is < 1
	if (this.typeNumber < 1 ){
		var typeNumber = 1;
		for (typeNumber = 1; typeNumber < 40; typeNumber++) {
			var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

			var buffer = new BitBuffer();
			var totalDataCount = 0;
			for (var i = 0; i < rsBlocks.length; i++) {
				totalDataCount += rsBlocks[i].dataCount;
			}

			for (var i = 0; i < this.dataList.length; i++) {
				var data = this.dataList[i];
				buffer.put(data.mode, 4);
				buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
				data.write(buffer);
			}
			if (buffer.getLengthInBits() <= totalDataCount * 8)
				break;
		}
		this.typeNumber = typeNumber;
	}
	this.makeImpl(false, this.getBestMaskPattern() );
};

proto.makeImpl = function(test, maskPattern) {
	
	this.moduleCount = this.typeNumber * 4 + 17;
	this.modules = new Array(this.moduleCount);
	
	for (var row = 0; row < this.moduleCount; row++) {
		
		this.modules[row] = new Array(this.moduleCount);
		
		for (var col = 0; col < this.moduleCount; col++) {
			this.modules[row][col] = null;//(col + row) % 3;
		}
	}

	this.setupPositionProbePattern(0, 0);
	this.setupPositionProbePattern(this.moduleCount - 7, 0);
	this.setupPositionProbePattern(0, this.moduleCount - 7);
	this.setupPositionAdjustPattern();
	this.setupTimingPattern();
	this.setupTypeInfo(test, maskPattern);
	
	if (this.typeNumber >= 7) {
		this.setupTypeNumber(test);
	}

	if (this.dataCache == null) {
		this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
	}

	this.mapData(this.dataCache, maskPattern);
};

proto.setupPositionProbePattern = function(row, col)  {
	
	for (var r = -1; r <= 7; r++) {
		
		if (row + r <= -1 || this.moduleCount <= row + r) continue;
		
		for (var c = -1; c <= 7; c++) {
			
			if (col + c <= -1 || this.moduleCount <= col + c) continue;
			
			if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
					|| (0 <= c && c <= 6 && (r == 0 || r == 6) )
					|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
				this.modules[row + r][col + c] = true;
			} else {
				this.modules[row + r][col + c] = false;
			}
		}		
	}		
};

proto.getBestMaskPattern = function() {

	var minLostPoint = 0;
	var pattern = 0;

	for (var i = 0; i < 8; i++) {
		
		this.makeImpl(true, i);

		var lostPoint = util.getLostPoint(this);

		if (i == 0 || minLostPoint >  lostPoint) {
			minLostPoint = lostPoint;
			pattern = i;
		}
	}

	return pattern;
};

proto.createMovieClip = function(target_mc, instance_name, depth) {

	var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
	var cs = 1;

	this.make();

	for (var row = 0; row < this.modules.length; row++) {
		
		var y = row * cs;
		
		for (var col = 0; col < this.modules[row].length; col++) {

			var x = col * cs;
			var dark = this.modules[row][col];
		
			if (dark) {
				qr_mc.beginFill(0, 100);
				qr_mc.moveTo(x, y);
				qr_mc.lineTo(x + cs, y);
				qr_mc.lineTo(x + cs, y + cs);
				qr_mc.lineTo(x, y + cs);
				qr_mc.endFill();
			}
		}
	}
	
	return qr_mc;
};

proto.setupTimingPattern = function() {
	
	for (var r = 8; r < this.moduleCount - 8; r++) {
		if (this.modules[r][6] != null) {
			continue;
		}
		this.modules[r][6] = (r % 2 == 0);
	}

	for (var c = 8; c < this.moduleCount - 8; c++) {
		if (this.modules[6][c] != null) {
			continue;
		}
		this.modules[6][c] = (c % 2 == 0);
	}
};

proto.setupPositionAdjustPattern = function() {

	var pos = util.getPatternPosition(this.typeNumber);
	
	for (var i = 0; i < pos.length; i++) {
	
		for (var j = 0; j < pos.length; j++) {
		
			var row = pos[i];
			var col = pos[j];
			
			if (this.modules[row][col] != null) {
				continue;
			}
			
			for (var r = -2; r <= 2; r++) {
			
				for (var c = -2; c <= 2; c++) {
				
					if (r == -2 || r == 2 || c == -2 || c == 2
							|| (r == 0 && c == 0) ) {
						this.modules[row + r][col + c] = true;
					} else {
						this.modules[row + r][col + c] = false;
					}
				}
			}
		}
	}
};

proto.setupTypeNumber = function(test) {

	var bits = util.getBCHTypeNumber(this.typeNumber);

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
	}

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
	}
};

proto.setupTypeInfo = function(test, maskPattern) {

	var data = (this.errorCorrectLevel << 3) | maskPattern;
	var bits = util.getBCHTypeInfo(data);

	// vertical		
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);

		if (i < 6) {
			this.modules[i][8] = mod;
		} else if (i < 8) {
			this.modules[i + 1][8] = mod;
		} else {
			this.modules[this.moduleCount - 15 + i][8] = mod;
		}
	}

	// horizontal
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);
		
		if (i < 8) {
			this.modules[8][this.moduleCount - i - 1] = mod;
		} else if (i < 9) {
			this.modules[8][15 - i - 1 + 1] = mod;
		} else {
			this.modules[8][15 - i - 1] = mod;
		}
	}

	// fixed module
	this.modules[this.moduleCount - 8][8] = (!test);
};

proto.mapData = function(data, maskPattern) {
	
	var inc = -1;
	var row = this.moduleCount - 1;
	var bitIndex = 7;
	var byteIndex = 0;
	
	for (var col = this.moduleCount - 1; col > 0; col -= 2) {

		if (col == 6) col--;

		while (true) {

			for (var c = 0; c < 2; c++) {
				
				if (this.modules[row][col - c] == null) {
					
					var dark = false;

					if (byteIndex < data.length) {
						dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
					}

					var mask = util.getMask(maskPattern, row, col - c);

					if (mask) {
						dark = !dark;
					}
					
					this.modules[row][col - c] = dark;
					bitIndex--;

					if (bitIndex == -1) {
						byteIndex++;
						bitIndex = 7;
					}
				}
			}
							
			row += inc;

			if (row < 0 || this.moduleCount <= row) {
				row -= inc;
				inc = -inc;
				break;
			}
		}
	}
};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new BitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalDataCount += rsBlocks[i].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. ("
			+ buffer.getLengthInBits()
			+ ">"
			+  totalDataCount * 8
			+ ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 != 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = util.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new Polynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
			ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalCodeCount += rsBlocks[i].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var i = 0; i < maxDcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < dcdata[r].length) {
				data[index++] = dcdata[r][i];
			}
		}
	}

	for (var i = 0; i < maxEcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < ecdata[r].length) {
				data[index++] = ecdata[r][i];
			}
		}
	}

	return data;
};

module.exports = QRCode;



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var mode = __webpack_require__(4);

function QR8bitByte(data) {
	this.mode = mode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function(buffer) {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;



/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// ErrorCorrectLevel
var ECL = __webpack_require__(5);

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock == undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = new Array();
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
}

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case ECL.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case ECL.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case ECL.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case ECL.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
}

module.exports = QRRSBlock;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

function QRBitBuffer() {
	this.buffer = new Array();
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(4);
var Polynomial = __webpack_require__(6);
var math = __webpack_require__(7);

var QRMaskPattern = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

var QRUtil = {

    PATTERN_POSITION_TABLE : [
	    [],
	    [6, 18],
	    [6, 22],
	    [6, 26],
	    [6, 30],
	    [6, 34],
	    [6, 22, 38],
	    [6, 24, 42],
	    [6, 26, 46],
	    [6, 28, 50],
	    [6, 30, 54],		
	    [6, 32, 58],
	    [6, 34, 62],
	    [6, 26, 46, 66],
	    [6, 26, 48, 70],
	    [6, 26, 50, 74],
	    [6, 30, 54, 78],
	    [6, 30, 56, 82],
	    [6, 30, 58, 86],
	    [6, 34, 62, 90],
	    [6, 28, 50, 72, 94],
	    [6, 26, 50, 74, 98],
	    [6, 30, 54, 78, 102],
	    [6, 28, 54, 80, 106],
	    [6, 32, 58, 84, 110],
	    [6, 30, 58, 86, 114],
	    [6, 34, 62, 90, 118],
	    [6, 26, 50, 74, 98, 122],
	    [6, 30, 54, 78, 102, 126],
	    [6, 26, 52, 78, 104, 130],
	    [6, 30, 56, 82, 108, 134],
	    [6, 34, 60, 86, 112, 138],
	    [6, 30, 58, 86, 114, 142],
	    [6, 34, 62, 90, 118, 146],
	    [6, 30, 54, 78, 102, 126, 150],
	    [6, 24, 50, 76, 102, 128, 154],
	    [6, 28, 54, 80, 106, 132, 158],
	    [6, 32, 58, 84, 110, 136, 162],
	    [6, 26, 54, 82, 110, 138, 166],
	    [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
	    var d = data << 10;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
		    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) ); 	
	    }
	    return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
	    var d = data << 12;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
		    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) ); 	
	    }
	    return (data << 12) | d;
    },

    getBCHDigit : function(data) {

	    var digit = 0;

	    while (data != 0) {
		    digit++;
		    data >>>= 1;
	    }

	    return digit;
    },

    getPatternPosition : function(typeNumber) {
	    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
	    
	    switch (maskPattern) {
		    
	    case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
	    case QRMaskPattern.PATTERN001 : return i % 2 == 0;
	    case QRMaskPattern.PATTERN010 : return j % 3 == 0;
	    case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
	    case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
	    case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
	    case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
	    case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

	    default :
		    throw new Error("bad maskPattern:" + maskPattern);
	    }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

	    var a = new Polynomial([1], 0);

	    for (var i = 0; i < errorCorrectLength; i++) {
		    a = a.multiply(new Polynomial([1, math.gexp(i)], 0) );
	    }

	    return a;
    },

    getLengthInBits : function(mode, type) {

	    if (1 <= type && type < 10) {

		    // 1 - 9

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 10;
		    case Mode.MODE_ALPHA_NUM 	: return 9;
		    case Mode.MODE_8BIT_BYTE	: return 8;
		    case Mode.MODE_KANJI  	: return 8;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 27) {

		    // 10 - 26

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 12;
		    case Mode.MODE_ALPHA_NUM 	: return 11;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 10;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 41) {

		    // 27 - 40

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 14;
		    case Mode.MODE_ALPHA_NUM	: return 13;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 12;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else {
		    throw new Error("type:" + type);
	    }
    },

    getLostPoint : function(qrCode) {
	    
	    var moduleCount = qrCode.getModuleCount();
	    
	    var lostPoint = 0;
	    
	    // LEVEL1
	    
	    for (var row = 0; row < moduleCount; row++) {

		    for (var col = 0; col < moduleCount; col++) {

			    var sameCount = 0;
			    var dark = qrCode.isDark(row, col);

				for (var r = -1; r <= 1; r++) {

				    if (row + r < 0 || moduleCount <= row + r) {
					    continue;
				    }

				    for (var c = -1; c <= 1; c++) {

					    if (col + c < 0 || moduleCount <= col + c) {
						    continue;
					    }

					    if (r == 0 && c == 0) {
						    continue;
					    }

					    if (dark == qrCode.isDark(row + r, col + c) ) {
						    sameCount++;
					    }
				    }
			    }

			    if (sameCount > 5) {
				    lostPoint += (3 + sameCount - 5);
			    }
		    }
	    }

	    // LEVEL2

	    for (var row = 0; row < moduleCount - 1; row++) {
		    for (var col = 0; col < moduleCount - 1; col++) {
			    var count = 0;
			    if (qrCode.isDark(row,     col    ) ) count++;
			    if (qrCode.isDark(row + 1, col    ) ) count++;
			    if (qrCode.isDark(row,     col + 1) ) count++;
			    if (qrCode.isDark(row + 1, col + 1) ) count++;
			    if (count == 0 || count == 4) {
				    lostPoint += 3;
			    }
		    }
	    }

	    // LEVEL3

	    for (var row = 0; row < moduleCount; row++) {
		    for (var col = 0; col < moduleCount - 6; col++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row, col + 1)
					    &&  qrCode.isDark(row, col + 2)
					    &&  qrCode.isDark(row, col + 3)
					    &&  qrCode.isDark(row, col + 4)
					    && !qrCode.isDark(row, col + 5)
					    &&  qrCode.isDark(row, col + 6) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount - 6; row++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row + 1, col)
					    &&  qrCode.isDark(row + 2, col)
					    &&  qrCode.isDark(row + 3, col)
					    &&  qrCode.isDark(row + 4, col)
					    && !qrCode.isDark(row + 5, col)
					    &&  qrCode.isDark(row + 6, col) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    // LEVEL4
	    
	    var darkCount = 0;

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount; row++) {
			    if (qrCode.isDark(row, col) ) {
				    darkCount++;
			    }
		    }
	    }
	    
	    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
	    lostPoint += ratio * 10;

	    return lostPoint;		
    }
};

module.exports = QRUtil;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

var EventList = __webpack_require__(1);

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return React.createElement(EventList, {
      canBack: true,
      type: this.props.request.search.type
    });
  }
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      event: null,
      fields: null,
      data: null,
      toolbarItems: [{
        text: '批量删除',
        name: 'remove',
        status: 'danger',
        icon: 'fa-remove',
        style: {
          marginRight: 5
        }
      }, {
        text: '导出为Excel',
        name: 'exports',
        status: 'warning',
        icon: 'fa-download',
        style: {
          marginRight: 5
        }
      }]
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
            type: field.type,
            width: field.width
          };
        });

        _data.fields.push({
          title: '微信账号',
          name: 'openid_convert',
          width: 200
        });

        _data.fields.push({
          title: '提交时间',
          name: 'zn_create_time',
          width: 130
        });

        _data.data = zn.store.post('/zn.plugin.survey/event/pagingEventResult', {
          event_uuid: _data.event.zn_id
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
        action: "/zn.plugin.admin/model/insert",
        merge: "values",
        exts: {
          model: this.props.model
        },
        onSubmitSuccess: this.__doSuccess,
        items: this.state.formItems
      })
    });
  },
  __removeItems: function __removeItems() {
    var _self = this,
        _values = this.refs.table.getValue();

    if (_values && _values.length) {
      zn.confirm('确认删除这' + _values.length + '个用户吗？', '提示', function () {
        zn.preloader.open({
          content: '删除中...'
        });
        zn.http.post('/zn.plugin.survey/event/deleteEventResult', {
          event_uuid: this.state.event.zn_id,
          ids: _values.join(',')
        }).then(function (data) {
          if (data.status == 200) {
            zn.toast.success('删除成功');

            _self.refs.table.setValue([]);

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
    } else {
      zn.toast.warning('请先选择要删除的用户');
    }
  },
  __onToolbarClick: function __onToolbarClick(item) {
    switch (item.name) {
      case 'exports':
        zn.react.downloadURL(zn.http.fixURL('/zn.plugin.survey/event/downloadEventResult') + "?event_uuid=" + this.state.event.zn_id, this.state.event.zn_title);
        break;

      case 'remove':
        this.__removeItems();

        break;
    }
  },
  __onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
    if (item.name == 'openid_convert') {
      if (value && value.split) {
        var _value = value.split('&&__zn__&&');

        return React.createElement("div", {
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        }, _value[1] && React.createElement("img", {
          className: "avatar",
          style: {
            width: 16,
            height: 16,
            margin: 5,
            borderRadius: 16
          },
          src: _value[1]
        }), React.createElement("a", {
          onClick: function onClick() {
            return zn.react.session.relativeJump('/znpluginwechat.user.info', {
              openid: data.zn_plugin_wechat_open_id
            });
          }
        }, _value[0]));
      }
    }

    switch (item.type) {
      case 'FileUploader':
      case 'ImageUploader':
      case 'Images':
        return React.createElement(zn.react.Files, {
          value: value
        });
    }
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      title: this.state.event ? this.state.event.zn_title : "活动报表",
      toolbarItems: this.state.toolbarItems,
      onToolbarClick: this.__onToolbarClick
    }, this.state.event ? React.createElement(zn.react.PagerView, {
      ref: "table",
      view: "Table",
      enableFilter: true,
      checkbox: 50,
      showHeader: true,
      columnRender: this.__onTableColumnRender,
      data: this.state.data,
      items: this.state.fields
    }) : React.createElement(zn.react.DataLoader, {
      content: "\u52A0\u8F7D\u4E2D...",
      loader: "timer"
    }));
  }
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
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
    return React.createElement("div", {
      className: "submit-error"
    }, React.createElement("div", null, React.createElement("i", {
      className: "fa fa-frown-o"
    })), React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: error
      }
    }));
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

    return React.createElement("div", {
      className: "submit-form"
    }, !!this.state.event.show_count && React.createElement("div", {
      className: "count-info"
    }, "\u8FD8\u5269", React.createElement("span", {
      className: "count"
    }, this.state.event.max_count - this.state.event.count), "\u4E2A\u540D\u989D"), React.createElement(zn.react.Form, {
      ref: "form",
      merge: "data",
      className: "form",
      itemClassName: "column",
      action: "/zn.plugin.survey/event/submitEvent",
      items: this.state.fields,
      onSubmitBefore: this.__onSubmit,
      buttons: []
    }), React.createElement(zn.react.Button, {
      onClick: function onClick() {
        return _this.refs.form.submit();
      },
      className: "submit-btn",
      text: "\u63D0\u4EA4\u8868\u5355",
      icon: "fa-pencil",
      status: "warning"
    }));
  },
  __renderResult: function __renderResult() {
    return React.createElement("div", {
      className: "submit-form"
    }, React.createElement("div", {
      className: "success-tip",
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left'
      }
    }, React.createElement("i", {
      className: "fa fa-smile-o zr-padding-3"
    }), React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: this.state.event.success_message
      }
    })), !!this.state.event.show_count && React.createElement("div", {
      className: "count-info"
    }, "\u8FD8\u5269", React.createElement("span", {
      className: "count"
    }, this.state.event.max_count - this.state.event.count), "\u4E2A\u540D\u989D"), React.createElement("ul", {
      className: "field-value"
    }, this.state.data.map(function (item, index) {
      return React.createElement("li", {
        className: "field-item"
      }, React.createElement("span", {
        className: "fi-title"
      }, item.title), React.createElement("span", {
        className: "fi-value"
      }, item.value));
    })));
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
          return React.createElement("div", null, React.createElement("div", {
            className: "success-tip",
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'left'
            }
          }, React.createElement("i", {
            className: "fa fa-smile-o zr-padding-3"
          }), React.createElement("div", {
            dangerouslySetInnerHTML: {
              __html: this.state.event.success_message
            }
          })), React.createElement(zn.react.Button, {
            onClick: function onClick() {
              return _this2.setState({
                submited: false
              });
            },
            text: "\u8FD4\u56DE(BACK)",
            icon: "fa-angle-left",
            status: "warning"
          }));
        } else {
          return this.__renderForm();
        }
      }
    } else if (this.state.event) {
      return this.__renderForm();
    }

    return React.createElement(zn.react.DataLoader, {
      content: "\u52A0\u8F7D\u6570\u636E\u4E2D...",
      loader: "timer"
    });
  },
  render: function render() {
    return React.createElement("div", {
      className: "zn-plugin-survey-event-submit",
      style: {
        color: this.state.event ? this.state.event.text_color : null
      }
    }, this.state.event && React.createElement("img", {
      className: "inner-bg",
      src: zn.http.fixURL(this.state.event.background_image)
    }), React.createElement("div", {
      className: "inner-content"
    }, this.state.event && React.createElement("div", {
      className: "inner-title"
    }, this.state.event.zn_title), this.__renderContent(), this.state.event && React.createElement("div", {
      className: "footer-title"
    }, this.state.event.footer_title)));
  }
});

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = __webpack_require__(0);

var EventList = __webpack_require__(1);

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      model: 'ZNPluginSurveyEventType',
      pid: 0,
      title: '活动类型管理',
      fields: [{
        title: '类型名称',
        type: 'Input',
        name: 'zn_title'
      }, {
        title: '表前缀',
        type: 'Input',
        name: 'table_prefix',
        value: 'zn_plugin_survey_event_table_'
      }, {
        title: '是否启用权限',
        type: 'Radio',
        name: 'zn_rights_enabled',
        value: 0,
        data: [{
          text: '禁止',
          value: 0
        }, {
          text: '启用',
          value: 1
        }]
      }, {
        title: '拥有者',
        type: zn.plugin.admin.UserSelector,
        mulitable: false,
        name: 'zn_rights_owner_id'
      }, {
        title: '操作用户',
        type: zn.plugin.admin.UserSelector,
        mulitable: true,
        name: 'zn_rights_users'
      }, {
        title: '查看用户',
        type: zn.plugin.admin.UserSelector,
        mulitable: true,
        name: 'zn_rights_observe_users'
      }, {
        title: '操作角色',
        type: zn.plugin.admin.RoleSelector,
        name: 'zn_rights_roles'
      }, {
        title: '查看角色',
        type: zn.plugin.admin.RoleSelector,
        name: 'zn_rights_observe_roles'
      }, {
        title: '扩展',
        type: 'Textarea',
        name: 'zn_tree_extend'
      }]
    };
  },
  __rightRender: function __rightRender(data) {
    return React.createElement(EventList, {
      type: data.value
    });
  },
  render: function render() {
    return React.createElement(zn.plugin.admin.TreeModelView, _extends({}, this.props, {
      emptyRender: function emptyRender() {
        return React.createElement(EventList, null);
      },
      rightRender: this.__rightRender,
      leftWidth: 160
    }));
  }
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Info.js": 32,
	"./List.js": 9,
	"./PaperAnswer.js": 33,
	"./Type.js": 34,
	"./index.js": 8
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 31;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      status: 0,
      data: zn.store.post('/zn.plugin.survey/paper/getPapersByType', {
        type: this.props.data ? this.props.data.value : null,
        status: 0
      }),
      formItems: [{
        title: '问卷标题',
        name: 'zn_title',
        type: 'Input',
        required: true,
        error: '用户名必填项!'
      }, {
        title: '最大限制',
        name: 'max_count',
        type: 'Input',
        attrs: {
          type: 'number'
        }
      }, {
        title: '开始时间',
        name: 'start_time',
        type: 'Input',
        attrs: {
          type: 'date'
        }
      }, {
        title: '结束时间',
        name: 'end_time',
        type: 'Input',
        attrs: {
          type: 'date'
        }
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
        text: '添加字段',
        name: 'add',
        icon: 'fa-plus',
        style: {
          marginRight: 5
        }
      }]
    };
  },
  componentDidMount: function componentDidMount() {},
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
        return React.createElement("span", null, "\u5F85\u53D1\u5E03");

      case 1:
        return React.createElement("span", null, "\u5DF2\u53D1\u5E03");

      case 2:
        return React.createElement("span", null, "\u5DF2\u7ED3\u675F");

      case -1:
        return React.createElement("span", null, "\u4E0B\u7EBF");
    }
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
      style: {
        padding: 10
      },
      full: false,
      value: 35
    })), React.createElement("div", {
      className: "inner-right"
    }, React.createElement("div", {
      className: "r-header"
    }, React.createElement("span", {
      className: "name",
      onClick: function onClick() {
        return zn.react.session.relativeJump('/znpluginsurvey.paper.info', {
          znid: item.zn_id
        });
      }
    }, item.zn_title), React.createElement("span", {
      className: "h-tag"
    }, this.__renderStatus(item.status)), React.createElement("i", {
      "data-tooltip": "\u4FEE\u6539\u4FE1\u606F",
      onClick: function onClick() {
        return _this.__updateItem(item);
      },
      className: "fa fa-edit h-btn"
    })), React.createElement("div", {
      className: "r-item"
    }, React.createElement("span", {
      className: "_key"
    }, "\u6700\u5927\u9650\u5236"), React.createElement("span", {
      className: "h-tag"
    }, item.max_count)), React.createElement("div", {
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
      className: "_key"
    }, "\u5907\u6CE8\uFF1A"), React.createElement("span", {
      className: "_value"
    }, item.comment))));
  },
  __doSuccess: function __doSuccess() {
    this.state.data.refresh();
  },
  __addItem: function __addItem() {
    zn.dialog({
      title: '新增问卷',
      content: React.createElement(zn.react.Form, {
        action: "/zn.plugin.admin/model/insert",
        merge: "values",
        hiddens: {
          zn_id: zn.uuid(),
          type_id: this.props.data.value
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
    console.log(data);
    zn.dialog({
      title: '更新问卷',
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
  __removeItems: function __removeItems() {
    var _self = this,
        _values = this.refs.table.getValue();

    if (_values && _values.length) {
      zn.confirm('确认删除这' + _values.length + '个用户吗？', '提示', function () {
        zn.http.post('/zn.plugin.admin/model/delete', {
          model: this.state.model,
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
    return React.createElement(zn.react.Page, {
      canBack: false,
      className: "zn-plugin-survey-paper-list",
      title: "\u95EE\u5377\u5217\u8868",
      toolbarItems: this.props.data ? this.state.toolbarItems : [],
      onToolbarClick: this.__onToolbarClick,
      headerCenter: React.createElement(zn.react.ListView, {
        className: "zr-tab-ios",
        selectMode: "radio",
        valueKey: "status",
        onClick: this.__onStatusChange,
        value: this.state.status,
        data: [{
          status: 0,
          text: '待发布'
        }, {
          status: 1,
          text: '已发布'
        }, {
          status: 2,
          text: '已结束'
        }]
      })
    }, React.createElement(zn.react.PagerView, {
      view: "ListView",
      className: "projects",
      data: this.state.data,
      itemRender: this.__onItemRender
    }));
  }
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      data: zn.store.post('/zn.plugin.admin/model/paging', {
        model: this.props.model,
        where: {
          user_openid: this.props.request.search.useropenid
        }
      }),
      items: [{
        title: '用户',
        name: 'user_openid',
        width: 100
      }, {
        title: '时间',
        name: 'zn_create_time',
        width: 180
      }, {
        title: '类型',
        name: 'status',
        width: 80
      }, {
        title: '说明',
        name: 'zn_note'
      }]
    };
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      toolbarItems: [{
        text: '导出'
      }],
      onToolbarClick: this.__onToolbarClick,
      title: "\u7528\u6237\u767B\u5F55\u65E5\u5FD7"
    }, React.createElement(zn.react.PagerView, {
      view: "Table",
      enableFilter: false,
      checkbox: 0,
      showHeader: true,
      data: this.state.data,
      items: this.state.items
    }));
  }
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = __webpack_require__(0);

var PaperList = __webpack_require__(9);

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      model: 'ZNPluginSurveyPaperType',
      pid: 0,
      title: '问卷类型管理',
      fields: [{
        title: '类型名称',
        type: 'Input',
        name: 'zn_title'
      }, {
        title: '表前缀',
        type: 'Input',
        name: 'table_prefix',
        value: 'zn_plugin_survey_paper_table_'
      }, {
        title: '是否启用权限',
        type: 'Radio',
        name: 'zn_rights_enabled',
        value: 0,
        data: [{
          text: '禁止',
          value: 0
        }, {
          text: '启用',
          value: 1
        }]
      }, {
        title: '拥有者',
        type: zn.plugin.admin.UserSelector,
        mulitable: false,
        name: 'zn_rights_owner_id'
      }, {
        title: '操作用户',
        type: zn.plugin.admin.UserSelector,
        mulitable: true,
        name: 'zn_rights_users'
      }, {
        title: '查看用户',
        type: zn.plugin.admin.UserSelector,
        mulitable: true,
        name: 'zn_rights_observe_users'
      }, {
        title: '操作角色',
        type: zn.plugin.admin.RoleSelector,
        name: 'zn_rights_roles'
      }, {
        title: '查看角色',
        type: zn.plugin.admin.RoleSelector,
        name: 'zn_rights_observe_roles'
      }, {
        title: '扩展',
        type: 'Textarea',
        name: 'zn_tree_extend'
      }]
    };
  },
  __rightRender: function __rightRender(data) {
    return React.createElement(PaperList, {
      data: data
    });
  },
  render: function render() {
    return React.createElement(zn.plugin.admin.TreeModelView, _extends({}, this.props, {
      emptyRender: function emptyRender() {
        return React.createElement(PaperList, null);
      },
      rightRender: this.__rightRender,
      leftWidth: 160
    }));
  }
});

/***/ })
/******/ ]);