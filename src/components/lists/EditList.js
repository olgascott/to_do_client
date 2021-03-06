var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var EditList = React.createClass({
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
    ListActions.updateList(this.props.id, {title: this.state.title});
    this.setState({ editTitle: false }); 
  },

  handleDelete: function() {
    ListActions.deleteList(this.props.id);
  },

  render: function () {
    var obj = this;
    var titleOrField = (this.state.editTitle == true) ? (
      <section className="edit_list_title_form">
        <form onSubmit={this._onSubmit}>
          <input type="text" name="title" placeholder="Title" autoComplete="off" value={this.state.title} onChange={this.onTitleChange} />
          <button type="submit">Save</button>
        </form>
      </section>
    ) : (
      <h5>{obj.props.title}</h5>
    );

    return (
      <section className="list_controls">
        <section className="title_or_field">
          {titleOrField}
        </section>
        <span className="edit" onClick={obj.toggleEditTitle}>Edit</span>
        <span className="delete" onClick={obj.handleDelete}>Delete</span>
      </section>
    );
  }
});

module.exports = EditList;