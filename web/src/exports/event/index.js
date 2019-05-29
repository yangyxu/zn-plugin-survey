module.exports = zn.arrayValueToObject([
    'Type',
    'Result',
    'Submit',
    'Info',
    'List'
], function (value, index){
    return require('./'+value+'.js');
});
