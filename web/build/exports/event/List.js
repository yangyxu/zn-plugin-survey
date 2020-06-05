"use strict";

var React = require('react');

var EventList = require('../../component/EventList.js');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return /*#__PURE__*/React.createElement(EventList, {
      canBack: true,
      type: this.props.request.search.type
    });
  }
});