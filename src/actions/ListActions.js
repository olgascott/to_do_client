var Reflux = require('reflux');

var ListActions = Reflux.createActions([
  'createList',
  'loadLists',
  'addToDo',
  'updateToDo'
]);

module.exports = ListActions;