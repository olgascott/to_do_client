var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var List = require('./List');

var Lists = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return ({
      lists: null
    });
  },

  componentDidMount: function () {
    ListActions.loadLists();
    this.listenTo(ListStore, this.updateListsState);
  },

  updateListsState: function(data) {
    this.setState({
      lists: data
    });
  },

  render: function () {
    var renderedLists;

    if (this.state.lists) {
      renderedLists = this.state.lists.map(function (list) {
        return <List data={list} key={list.id} />
      });
    }

    return (
      <section className="lists">
        {renderedLists}
      </section>
    );
  }
});

module.exports = Lists;