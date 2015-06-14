var React = require('react');
var Reflux = require('reflux');

var NewListForm = require('./lists/NewListForm')

var App = React.createClass({
  mixins: [Reflux.ListenerMixin],

  render: function () {
    return (
      <NewListForm />
    );
  }
});

module.exports = App;