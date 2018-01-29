zn.plugin.survey = require('./component/index.js');
zn.deepEachObject({}, function (value) {
  return require(value);
});
module.exports = zn.react.extendPath('/znpluginsurvey.', require('./exports/index.js'));