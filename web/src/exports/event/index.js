module.exports = zn.arrayValueToObject([
    'Type',
    'List',
    'Submit',
    'Info'
], function (value, index){
    return require('./'+value+'.js');
});
