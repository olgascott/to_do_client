var Reflux = require('reflux');

var ListActions = Reflux.createActions([
  'createList',
  'loadLists',
  'addToDo',
  'updateToDo',
  'deleteToDo',
  'updateList',
  'deleteList'
]);

module.exports = ListActions;