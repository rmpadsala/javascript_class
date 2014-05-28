app.factory('TodoGroupResource', ['$resource', function($resource) {
  return $resource("/todo_groups/:id.json", {id: '@id'},{
    udpate: {
      method: 'PUT'
    }
  });
}]);
