var _exports = {},
    _export = null,
    _path = null;

[].forEach(function (path){
    _path = './' + path + '/index.js';
    _export = require(_path);
    for(var key in _export){
        _exports[(path + '.' + key)] = _export[key];
    }
});

[].forEach(function (path){
    _path = './' + path;
    _exports[(path)] = require(_path);
});

module.exports = _exports;
