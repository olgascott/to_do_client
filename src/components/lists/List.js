var React = require('react');
var Reflux = require('reflux');

var ListStore = require('../../stores/ListStore');
var ListActions = require('../../actions/ListActions');

var ToDo = require('../to_do/ToDo');
var NewToDoForm = require('../to_do/NewToDoForm');

var List = React.createClass({
  render: function () {
    var obj = this;

    var renderedToDos = this.props.data.to_dos.map(function (to_do) {
      return (<ToDo id={to_do.id} key={to_do.id} title={to_do.title} checked={to_do.checked} list_id={obj.props.data.id} />)
    });

    return (
      <section className="list">
        <h4>{this.props.data.title}</h4>
        <NewToDoForm list_id={this.props.data.id} />
        {renderedToDos}
      </section>
    );
  }
});

module.exports = List;