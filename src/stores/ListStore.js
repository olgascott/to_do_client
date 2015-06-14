var Reflux = require('reflux');
var reqwest = require('reqwest');
var _ = require('lodash');

var ListActions = require('../actions/ListActions');

var ListStore = Reflux.createStore({
  listenables: [ListActions],

  lists: [],

  onCreateList: function(data) {
    var obj = this;

    reqwest({
      url: "http://localhost:3000/api/1/lists",
      method: "POST",
      data: {title: data.title},
      success: function (res) {
        obj.lists.push(res);
        obj.trigger(obj.lists);
      }
    });
  }

});

module.exports = ListStore;