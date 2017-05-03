app.controller('mainController', function($scope, factory, $state) {
  //toggle form view
  // this.formContainer = true; //hidden
  this.thanks = false; //hidden
  this.sellForm = false;
  this.editMode = false; //hidden
  //an empty array to store 'items' and ng repeat them in html
  $scope.closet=[];

  //array of objects
  $scope.types = [{
    "pants":"bottom",
    "tights":"bottom",
    "shorts":"bottom",
    "top":"top",
    "spaghetti":"top",
    "sweater":"top",
    "jacket":"top",
    "coat":"top",
    "rainCoat":"top",
    "sportJacket":"top",
    "dress":null,
    "skirt":"bottom",
    "vest":"top",
    "overall":null,
    "other":null
  }]

//sorting buttons should change the sort by index
  $scope.sortType = function (){
    alert("im not working yet");
  };
  $scope.sortColor = function (){
    alert("im not working too");
  };

//getting items from db
  $scope.getItems = factory.getItems;

  $scope.getItems()
  .then(function(response){
    console.log(response);
    $scope.closet = response; //the items are populating the array
    console.log($scope.closet);
  })
  .catch(function(error){
    console.log(error);
  })

//adds submitted item onto closet array and send it to DB
  $scope.addItem = function(newItem){
       factory.addItem(newItem)
      .then(function(response){
        //console.log('response', response);
        $scope.closet.push(newItem);
        $state.go('closet');
        //console.log($scope.closet);
      })
      .catch(function(error){
        console.log(error);
      })
    };

$scope.sellFormBtn= function(){
  this.sellForm = true;
}
$scope.sellItem = function(newItem){

}

$scope.uploadFiles = function(){
  alert("upload moi");
}

//delete item
    $scope.removeItem = function(id){
      factory.removeItem(id)
      .then(function(response){
        $scope.closet.splice(id, 1);
        //console.log($scope.closet);
      })
      .catch(function(error){
        console.log(error);
      })
    };

//edit item
    $scope.editItem = function(id){
      this.editMode = true;
      console.log(id);
      factory.editItem(id)
      .then(function(response){
      })
      .catch(function(error){
        console.log(error);
      })
    };

    $scope.saveEdit = function(index){
      alert("save me");
    }

    //top types:
    //top, vest, shirt

    //bottom types:
    //pants, tights, shorts, skirt

});
