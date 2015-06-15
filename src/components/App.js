var React = require('react');
var Reflux = require('reflux');

var NewListForm = require('./lists/NewListForm')
var Lists = require('./lists/Lists')

var App = React.createClass({
  mixins: [Reflux.ListenerMixin],

  render: function () {
    return (
      <section className="container">
        <NewListForm />
        <Lists />
      </section>
    );
  }
});

module.exports = App;