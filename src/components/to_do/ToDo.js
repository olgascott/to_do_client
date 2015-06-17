var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var EditToDo = require('./EditToDo');

var ToDo = React.createClass({
  handleCheck: function() {
    ListActions.updateToDo(this.props.id, this.props.list_id, {checked: !this.props.checked});
  },

  render: function () {
    var obj = this;
    var classes = this.props.checked ? 'to_do checked' : 'to_do';

    return (
      <section className={classes}>
        <span className="checkbox" onClick={this.handleCheck}>
          <span className="icon" onClick={this.handleCheck} dangerouslySetInnerHTML={{__html: '<svg><use xlink:href="#icon_tick" /></svg>'}} />
        </span>
        <EditToDo list_id={obj.props.list_id} id={obj.props.id} title={obj.props.title} />
      </section>
    );
  }
});

module.exports = ToDo;