var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var EditToDoTitleForm = React.createClass({
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
    // ListActions.addToDo(this.props.list_id, this.state.title);
  },

  render: function () {
    return (
      <section className="edit_to_do_title_form">
        <form onSubmit={this._onSubmit} className="new_to_do">
          <input type="text" name="title" placeholder="Title" autoComplete="off" value={this.props.title} onChange={this.onTitleChange} />
          <button type="submit">Save</button>
        </form>
      </section>
    );
  }
});

module.exports = EditToDoTitleForm;