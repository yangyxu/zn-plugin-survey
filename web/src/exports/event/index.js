module.exports = zn.arrayValueToObject([
    'Type',
    'List',
    'Result',
    'Submit',
    'Info'
], function (value, index){
    return require('./'+value+'.js');
});
