app.factory('TodoResource', ['$resource', function($resource) {
  return $resource("/todos/:id.json", {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  })
}]);
