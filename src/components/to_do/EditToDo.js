var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var ToDo = require('./ToDo');

var EditToDo = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return ({
      title: this.props.title,
      editTitle: false
    });
  },

  onTitleChange: function (e) {
    this.setState({ title: e.target.value });
  },

  toggleEditTitle: function() {
    this.setState({ editTitle: !this.state.editTitle }); 
  },

  _onSubmit: function(e) {
    e.preventDefault();
    ListActions.updateToDo(this.props.id, this.props.list_id, {title: this.state.title});
    this.setState({ editTitle: false }); 
  },

  handleDelete: function() {
    ListActions.deleteToDo(this.props.id, this.props.list_id);
  },

  render: function () {
    var obj = this;
    var titleOrField = (this.state.editTitle == true) ? (
      <section className="edit_to_do_title_form">
        <form onSubmit={this._onSubmit}>
          <input type="text" name="title" placeholder="Title" autoComplete="off" value={this.state.title} onChange={this.onTitleChange} />
          <button type="submit">Save</button>
        </form>
      </section>
    ) : (
      <h5>{obj.props.title}</h5>
    );

    return (
      <section className="to_do_controls">
        <section className="title_or_field">
          {titleOrField}
        </section>
        <span className="edit" onClick={obj.toggleEditTitle}>Edit</span>
        <span className="delete" onClick={obj.handleDelete}>Delete</span>
      </section>
    );
  }
});

module.exports = EditToDo;