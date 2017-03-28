app.controller('mainController', function($scope, factory) {
  //toggle form view
  $scope.formContainer = false; //hidden
  $scope.thanks = false; //hidden
  //an empty array to store 'items' and ng repeat them in html
  $scope.closet=[];

//reveals form on-click
  $scope.openForm = function (){
    $scope.formContainer = true;//reveal form
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
    console.log(response);
    $scope.closet = response; //the items are populating the array
    console.log($scope.closet);
  })
  .catch(function(error){
    console.log(error);
  })

//adds submitted item onto closet array and send it to DB
  $scope.addItem = function(newItem){
      // factory.addItem(newItem)
      // .then(function(response){
        //console.log('response', response);
        //$scope.closet.push(newItem);
        $scope.formContainer = false; //hide form
        $scope.thanks = true; //show thanks
        //console.log($scope.closet);
      // })
      // .catch(function(error){
      //   console.log(error);
      // })
    };



  // //'import' functions from service
  // 	$scope.beers = service.beers;
  //   $scope.getBeers = service.getBeers;
  //   $scope.addBeer = service.addBeer;
  //   $scope.removeBeer = service.removeBeer;
  //   $scope.addRating = service.addRating;
  //   $scope.clearForm = service.clearForm;
  //   $scope.tempBeers = service.tempBeers;
  //   $scope.oldBeer = service.oldBeer;
  //
  // //toggle and funciton for sorting beerlist
  // 	$scope.reverse = false;
  //
  //   $scope.sortBeers = function () {
  //     $scope.reverse = !$scope.reverse;
  //   };
  //
  // //toggle and function for editing beer list
  //   $scope.edit = false;
  //
  //   $scope.editBeer = function (index) {
  //     //make specific beer (by index) editable on view
  //     console.log(this.beer);
  //
  //     this.edit = true;
  //     //make temp beer with info based on current beer info
  //     this.originalBeer = angular.copy(this.beer);
  //     //put this info into temporary array for any/all beers that are being edited
  //     //var editIndex = $scope.beers.findIndex(beer => beer._id == this.beer._id);
  //     //$scope.tempBeers[editIndex] = this.tempBeer;
  //   };
  //
  //    $scope.updateBeer = function (newBeer) {
  //     //change view to stop editing
  //     this.edit = false;
  //     //find the beer in beers array, copy the original info to oldBeer
  //     var self = this;
  //     //make request to db to change the info
  //     service.updateBeer(newBeer)
  //     .catch (function (err) {
  //    //upon fail, set beer's info back to oldBeer (old info)
  //    var updateIndex = $scope.beers.findIndex(beer => beer._id == newBeer._id);
  //    console.log(updateIndex);
  //     $scope.beers[updateIndex] = self.originalBeer;
  //     console.log(err);
  //     });
  //   };
  //
  //   $scope.cancelEdit = function (index) {
  //     //make specific beer (by index) not editable on view
  //     this.edit = false;
  //     //remove temporary beer information itself and from the array
  //     this.tempBeer = null;
  //     var editIndex = $scope.beers.findIndex(beer => beer._id == this.beer._id);
  //     $scope.tempBeers[editIndex] = null;
  //   };
  //
  //   // function for calculating the average of the ratings array
  //   $scope.avgFun = function (arr) {
  //   for(i=0,total=0;i<arr.length;i++){
  //       total += arr[i];
  //     }
  //   return (total/arr.length).toFixed(1);
  //   };
  //
  //
  //
  //   //initialy render the database beers to the view
  //   $scope.getBeers();

});
