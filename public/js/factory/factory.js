app.factory('factory', function($http){

  function addItem(newItem){
    return $http.post('/closetdb',newItem).then(function(response){
      return response.data;//happens later on the future
    });
  };

  return {addItem:addItem}

});
