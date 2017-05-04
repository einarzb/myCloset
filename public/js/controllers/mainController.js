app.controller('mainController', function($scope, factory, $state) {
  //toggle form view
  this.editMode = false; //hidden
  //an empty array to store 'items' and ng repeat them in html
  $scope.closet=[];
  //an empty array to store 'looks' and ng repeat them in html
  $scope.looks=[];
  //the chosem item that we wanna match clothes too
  $scope.mixItem;

  //array of objects
  var types = {
    "leggings": "bottom",
    "mini":"bottom",
    "midi":"bottom",
    "maxi":"bottom",
    "asymmetrical":"bottom",
    "pencil":"bottom",
    "pants":"bottom",
    "tights":"bottom",
    "shorts":"bottom",
    "top":"top",
    "blouse":"top",
    "crop":"top",
    "tank":"top",
    "long":"top",
    "short":"top",
    "tunic":"top",
    "spaghetti":"top",
    "sweater":"top",
    "jacket":"top",
    "coat":"top",
    "rainCoat":"top",
    "sportJacket":"top",
    "dress": null,
    "vest":"top",
    "other":null,
    "strapless":null,
    "backless":null,
    "blackdress":null,
    "jumpsuit": null
  };

//mix and match
$scope.mix = function (item){ //item is the object
  $scope.mixItem = item; //mixItem is the object chosen
  var matchItems =[];

  $scope.isTop = types[item.type] === "top";
  // console.log($scope.isTop);
  // console.log(types); //types is an object
  // console.log(item.type); //type of the chosen object (skirt e.g)

  if($scope.isTop){
    matchItems = $scope.closet.filter(function(item){
      return types[item.type] === "bottom";
          });
  }else if(types[item.type] == null) {
      console.log("im full body");
  } else {
    console.log("im bottom");
    matchItems = $scope.closet.filter(function(item){
      return types[item.type] === "top";
  });
}
  $scope.matchItems = matchItems;
}

//adding look
$scope.addLook = function(newLook){
      var top = $scope.matchItems[0].image; //suggestions
      var base = $scope.mixItem.image; // chosen item to match
      var newLook = {top:top, base:base}; //an object
    factory.addLook(newLook)
    .then(function(response){
      $scope.looks.push(response);
      console.log($scope.looks);
      $state.go('look');
    })
    .catch(function(error){
      console.log(error);
    })
  };

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
    $scope.closet = response; //the items are populating the array
  })
  .catch(function(error){
    console.log(error);
  })

//getting looks from db
  $scope.getLooks = factory.getLooks;

  $scope.getLooks()
  .then(function(response){
    $scope.looks = response; //the items are populating the array
  })
  .catch(function(error){
    console.log(error);
  })


//adds submitted item onto closet array and send it to DB
  $scope.addItem = function(newItem){
       factory.addItem(newItem)
      .then(function(response){
        //console.log('response', response);
        $scope.closet.push(response);
        $state.go('closet');
        //console.log($scope.closet);
      })
      .catch(function(error){
        console.log(error);
      })
    };

$scope.uploadFiles = function(){
  alert("upload moi");
}

//delete item
    $scope.removeItem = function(id, index){
      factory.removeItem(id)
      .then(function(response){
        $scope.closet.splice(index, 1);
      })
      .catch(function(error){
        console.log(error);
      })
    };



//delete look
    $scope.removeLook = function(id, index){
      console.log(id);
      console.log(index);
      factory.removeLook(id)
      .then(function(response){
        $scope.looks.splice(index, 1);
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
