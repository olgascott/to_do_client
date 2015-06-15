var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var NewToDoForm = React.createClass({
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
    ListActions.addToDo(this.props.list_id, this.state.title);
  },

  render: function () {
    return (
      <section className="new_to_do_form">
        <form onSubmit={this._onSubmit} className="new_to_do">
          <input type="text" name="title" placeholder="Title" autoComplete="off" onChange={this.onTitleChange} />
          <button type="submit">Create</button>
        </form>
      </section>
    );
  }
});

module.exports = NewToDoForm;