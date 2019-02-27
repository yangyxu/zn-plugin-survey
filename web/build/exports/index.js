"use strict";

require('./List.less');

var _exports = {},
    _export = null;
var _data = {
  event: require('./event/index.js'),
  paper: require('./paper/index.js')
};
Object.keys(_data).map(function (path) {
  _export = _data[path];

  for (var key in _export) {
    _exports[(path + '.' + key).toLowerCase()] = _export[key];
  }
});
module.exports = _exports;