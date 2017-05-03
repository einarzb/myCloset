app.controller('mainController', function($scope, factory, $state) {
  //toggle form view
  // this.formContainer = true; //hidden
  this.thanks = false; //hidden
  this.sellForm = false;
  this.editMode = false; //hidden
  //an empty array to store 'items' and ng repeat them in html
  $scope.closet=[];
  $scope.mixItem;
  //array of objects
  var types = {
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
    "Dress": null,
    "Skirt":"bottom",
    "Vest":"top",
    "overall":null,
    "other":null
  };

//mix and match
$scope.mix = function (item){
  $scope.mixItem = item;
  console.log($scope.mixItem);
  console.log($scope.mixItem.type);
  console.log (types[item.type]);//bottom
  console.log(item.type); //skirt

  var matchItems =[];

  $scope.isTop = types[item.type] == "top";
  console.log($scope.isTop);
  //$scope.isBottom = types[item.type] == "bottom";

  if($scope.isTop){
    matchItems = $scope.closet.filter(function(item){
      return types[item.type] == "bottom";
  });

    // console.log($scope.closet);
    // console.log(matchItems); //
    // console.log (item.type);
    // console.log("im top")

  } else {
    console.log("im bottom");
    matchItems = $scope.closet.filter(function(item){
      return types[item.type] == "top";
  });
}
    $scope.matchItems = matchItems;
}

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
    $scope.removeItem = function(id, index){
      console.log(id);
      factory.removeItem(id)
      .then(function(response){
        $scope.closet.splice(index, 1);
        console.log($scope.closet);
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

});
