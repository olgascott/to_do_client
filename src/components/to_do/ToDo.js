var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var EditToDoTitleForm = require('./EditToDoTitleForm');

var ToDo = React.createClass({
  getInitialState: function () {
    return ({
      editTitle: false
    });
  },

  handleCheck: function() {
    ListActions.updateToDo(this.props.id, this.props.list_id, {checked: !this.props.checked});
  },

  toggleEditTitle: function() {
    this.setState({ editTitle: !this.state.editTitle }); 
  },

  render: function () {
    var obj = this;
    var classes = this.props.checked ? 'to_do checked' : 'to_do';

    var titleOrField = (this.state.editTitle == true) ? (
      <EditToDoTitleForm list_id={obj.props.list_id} id={obj.props.id} title={obj.props.title} />
    ) : (
      <h5>{obj.props.title}</h5>
    );

    return (
      <section className={classes}>
        <span className="checkbox" onClick={this.handleCheck}></span>
        {titleOrField}
        <span className="edit" onClick={this.toggleEditTitle}></span>
      </section>
    );
  }
});

module.exports = ToDo;