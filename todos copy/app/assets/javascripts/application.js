// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require angular
//= require angular-resource
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var app = angular.module('app', ['ngResource']);

app.config(function ($httpProvider) {
  // CSRF
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
});

app.factory('TodoResource', function($resource) {
  return $resource("/todos/:id.json", {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  })
});

app.factory('TodoGroupResource', function($resource) {
  return $resource("/todo_groups/:todo_group_id/todos/:id.json", {
    id: '@id',
    todo_group_id: '@todo_group_id'
  },
  {
    udpate: {
      method: 'PUT'
    }
  });
});

app.factory('Group', function() {
  return {
    activeGroupId: 1,
    // activeGroup: {},
    groups: []
  }
});

app.controller('GroupsCtrl', function($scope, TodoGroupResource, Group) {
  $scope.group = Group;
  $scope.group.groups = TodoGroupResource.query({todo_group_id: activeGroupId });

  // Q: This did not work, not sure why first element is undefined
  // $scope.group.activeGroup = $scope.group.groups[0] || {};

  console.log($scope.group.groups[0]);

  $scope.addGroup = function(e) {
    e.preventDefault();
    var groupToAdd = { name: $scope.nextGroup }
    TodoGroupResource.save(groupToAdd, function(result) {
      $scope.group.groups.push(result);
    });
    $scope.nextGroup = "";
  };

  $scope.setCurrentGroup = function(e, group) {
    e.preventDefault();
    $scope.group.activeGroupId = group.id;
    console.log(",,,, Changed " + $scope.group.activeGroupId);
  };
});

app.controller('TodosCtrl', function ($scope, TodoResource, Group) {
  $scope.group = Group;
  $scope.todos = TodoResource.query({todo_group_id: activeGroupId });

  var updateResource = function(todo) {
    TodoResource.update(todo, function(response) {
      todo = response;
    });
  }

  $scope.visible = function() {
    return $scope.group.groups.length > 0;
  }

  $scope.toggleComplete = function(todo) {
    todo.complete = !todo.complete;
    updateResource(todo);
  };

  $scope.editTodo = function(e, todo) {
    e.preventDefault();
    todo.editable = false;
    updateResource(todo);
  };

  $scope.addTodo = function(e) {
    e.preventDefault();
    var todoToAdd = {title: $scope.nextTodo, complete: false, todo_group_id: activeGroupId };
    TodoResource.save(todoToAdd, function(response) {
      $scope.todos.unshift(response);
    });
    $scope.nextTodo = "";
  };

  $scope.removeTodo = function(e, index, todo) {
    e.preventDefault();
    TodoResource.remove({id: todo.id},
      function(success) {
        if (success.$resolved) {
          $scope.todos.splice(index, 1);
        }
      },
// Q: How to handle faiure case (for example resource not found) ??
      function(failure) {
        console.log("failed");
      });
  };

  $scope.showTodo = function(e, todo) {
    // TodoResource.get({id: todo.id});

  }

  $scope.toggleEditable = function(e, todo) {
    e.preventDefault();
    todo.editable = !todo.editable;
  };

// Q: Can we watch on activeGroupId directly which is being updated in
// other controller
  $scope.$watch('group', function(current, prev) {
    if (current.activeGroupId !== prev.activeGroupId) {
      console.log("active group changed, new: " + current.activeGroupId + ", prev: "
        + prev.activeGroupId);
      $scope.activeGroupId = current.activeGroupId;
    }
  }, true);

});
