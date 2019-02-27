"use strict";

module.exports = zn.arrayValueToObject(['Type', 'List', 'Info'], function (value, index) {
  return require('./' + value + '.js');
});