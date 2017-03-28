app.factory('factory', function($http){
//function adds items to db
  function addItem(newItem){
    return $http.post('/closetdb',newItem).then(function(response){
      return response.data;//happens later on the future
    });
  };
//function get itmes populated in mongoose to the ctrler
  function getItems(){
    alert("im get items function in factory");
    return $http.get('/closetdb').then(function(response){
      return response.data;
    });
  }



  return {addItem:addItem, getItems:getItems}

});
