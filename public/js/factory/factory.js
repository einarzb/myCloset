app.factory('factory', function($http){
//function adds items to db
  function addItem(newItem){
    return $http.post('/closetdb',newItem).then(function(response){
      return response.data;//happens later on the future
    });
  };
//function add looks
  function addLook (newLook){
    console.log("im in factoryryryryr");
    return $http.post('/look', newLook).then(function(response){
      console.log(response.data);
      return response.data; //happens later on the future
    });
  };

//function get itmes populated in mongoose to the ctrler
  function getItems(){
    return $http.get('/closetdb').then(function(response){
      return response.data;
    });
  };

  //function get looks populated in mongoose to the ctrler
    function getLooks(){
      return $http.get('/looks').then(function(response){
        return response.data;
      });
    };

  function removeItem(id){
    return $http.delete('/closetdb/' + id).then(function(response){
      confirm("are you sure you want to remove this item?");
      //make confirm work for real in cancel!
      return response.data;
     });
 };

 function editItem(id){
   return $http.put('/closetdb/' + id).then(function(response){
     return response.data;
    });
};
  return {addItem:addItem, addLook:addLook, getItems:getItems, getLooks:getLooks, removeItem:removeItem, editItem:editItem}

});
