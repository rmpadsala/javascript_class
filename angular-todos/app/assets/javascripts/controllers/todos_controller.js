app.controller('TodosCtrl', ['$scope', 'TodoResource', 'Group', function ($scope, TodoResource, Group) {
  $scope.group = Group;
  $scope.activeGroupId = Group.activeGroupId;
  $scope.todos = TodoResource.query();

  var updateResource = function(todo) {
    TodoResource.update(todo, function(response) {
      todo = response;
    },
    function(failure) {
      console.log("failed");
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
    var todoToAdd = {title: $scope.nextTodo, complete: false, todo_group_id: $scope.activeGroupId };
    console.log(todoToAdd);
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

}]);
