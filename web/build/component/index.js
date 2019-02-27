"use strict";

module.exports = zn.arrayValueToObject(['EventList'], function (value, index) {
  return require('./' + value + '.js');
});