angular.module('conFusion.controllers').controller('AppCtrl_2', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPopup) {


  console.log("AppCtrl_2 is working..");
}).controller('shopPage_controller', ['$scope', 'favoriteFactory', 'corporateFactory', 'shopFactory', 'shopProductsFactory', 'get_shops_Factory', 'baseURL', function ($scope, favoriteFactory, corporateFactory, shopFactory, shopProductsFactory, get_shops_Factory, baseURL) {
  $scope.baseURL = baseURL;

  console.log('shopPage_controller loaded');

  $scope.ratingsCallback = function (rating) {
    console.log('Selected rating is : ', rating);
  };


  $scope.leaders = corporateFactory.query(
    function (response) {
      $scope.leaders = response;
      $scope.showMenu = true;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    });

  $scope.shops = get_shops_Factory.query(
    function (response) {
      $scope.shops = response;
      $scope.showMenu = true;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    });

  $scope.getShopByID = function (ID) {
    if ($scope.shops[ID] == null) {
      return "no data";
    } else {
      return $scope.shops[ID];
    }
  };

  $scope.thisShop = function () {
    return $scope.shops["0"];
  };


  $scope.products = shopProductsFactory.query(
    function (response) {
      console.log('products: ' + response[0].product_name);
      $scope.products = response;
      $scope.showMenu = true;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    });

  $scope.thisShopProduct = function () {
    return $scope.products;
  };

  //add to favorite 
  $scope.addFavorite = function (index) {
    console.log("index is " + index);
    favoriteFactory.addToFavorites(index);
    $ionicListDelegate.closeOptionButtons(); // dismiss the option list
  };



}])
