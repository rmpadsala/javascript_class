app.controller('GroupsCtrl', ['$scope', 'TodoGroupResource', 'Group', function($scope, TodoGroupResource, Group) {
  $scope.group = Group;
  $scope.group.groups = TodoGroupResource.query();

  // Q: This did not work, not sure why first element is undefined
  // $scope.group.activeGroup = $scope.group.groups[0] || {};

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
  };
}]);
