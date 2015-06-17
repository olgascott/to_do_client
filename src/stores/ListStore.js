var Reflux = require('reflux');
var reqwest = require('reqwest');
var _ = require('lodash');

var ListActions = require('../actions/ListActions');

var ListStore = Reflux.createStore({
  listenables: [ListActions],

  lists: [],

  onLoadLists: function(data) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/lists",
      success: function (res) {
        obj.lists = res.lists;
        obj.trigger(obj.lists);
      }
    });
  },

  onCreateList: function(data) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/lists",
      method: "POST",
      data: {title: data.title},
      success: function (res) {
        obj.lists.unshift(res);
        obj.trigger(obj.lists);
      }
    });
  },

  onUpdateList: function(listId, data) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/lists/" + listId,
      method: "PUT",
      data: data,
      success: function (res) {
        var listIndex = _.findIndex(obj.lists, {id: listId});

        obj.lists[listIndex] = res;
        obj.trigger(obj.lists);
      }
    });
  },

  onDeleteList: function(listId) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/lists/" + listId,
      method: "DELETE",
      success: function (res) {
        var listIndex = _.findIndex(obj.lists, {id: listId});

        obj.lists.splice(listIndex, 1);
        obj.trigger(obj.lists);
      }
    });
  },

  onAddToDo: function(listId, title) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/to_dos",
      method: "POST",
      data: {list_id: listId, title: title},
      success: function (res) {
        var list = _.find(obj.lists, {id: listId});

        list.to_dos.unshift({
          id: res.id,
          title: res.title,
          checked: res.checked
        });

        obj.trigger(obj.lists);
      }
    });
  },

  onUpdateToDo: function(toDoId, listId, data) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/to_dos/" + toDoId,
      method: "PUT",
      data: data,
      success: function (res) {
        var listIndex = _.findIndex(obj.lists, {to_dos: [{id: toDoId}]});
        var toDoIndex = _.findIndex(obj.lists[listIndex].to_dos, {id: toDoId});

        obj.lists[listIndex].to_dos[toDoIndex] = res;

        obj.trigger(obj.lists);
      }
    });
  },

  onDeleteToDo: function(toDoId, listId) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/to_dos/" + toDoId,
      method: "DELETE",
      success: function (res) {
        var listIndex = _.findIndex(obj.lists, {to_dos: [{id: toDoId}]});
        var toDoIndex = _.findIndex(obj.lists[listIndex].to_dos, {id: toDoId});

        obj.lists[listIndex].to_dos.splice(toDoIndex, 1);
        obj.trigger(obj.lists);
      }
    });
  }

});

module.exports = ListStore;