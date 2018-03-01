var React = require('react');
var EventList = require('../../component/EventList.js');

module.exports = React.createClass({
	render:function(){
		return (
			<EventList canBack={true} type={this.props.request.search.type} />
		);
	}
});
