var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var NewListForm = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return ({
      title: null
    });
  },

  onTitleChange: function (e) {
    this.setState({ title: e.target.value });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    ListActions.createList(this.state);
  },

  render: function () {
    return (
      <section className="new_list_form">
        <form onSubmit={this._onSubmit} className="new_list">
          <input type="text" name="title" placeholder="Title" autoComplete="off" onChange={this.onTitleChange} />
          <button type="submit">Create</button>
        </form>
      </section>
    );
  }
});

module.exports = NewListForm;