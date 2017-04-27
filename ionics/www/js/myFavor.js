angular.module('conFusion.controllers').controller('myFavorController', function
    ($scope, menuFactory,
    favoriteFactory, shopProductsFactory, baseURL, $ionicListDelegate, $http) {
        $scope.baseURL = baseURL;
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        console.log("my_function MyFavouriteController");


    
        //$scope.products = $scope.getFa();
        getUserFavor();
        function getUserFavor() {
            $http.get('http://localhost:3000/userProfiles/findUserFavouritesByUser?user_id=2').
                then(function (response) {
                    $scope.temp = response.data;
                    //console.log('$scope.test: ' + $scope.temp.comment);
                    //console.log('$scope.test: ' + $scope.temp.comment[0].description);
                    $scope.favors = response.data.userFavourite;
                    var favor = $scope.favors;
                    for (var i = 0; i < favor.length; i++) {
                       
                        favor[i].icon = "button button-icon icon ion-ios-heart";
                        favor[i].imagePath = "http://localhost:3000/products/openImage?product_id=" + favor[i].product[0].product_id;

                    };


                });
        };

        
        $scope.removeFavor = function (index) {
            console.log("removeFavor index: " + index);
            console.log("check: " +  + "," + $scope.favors[index].product[0].product_name);
            //var Indata = { "product_id": $scope.favors[index].product[0].product_id, "user_id": "2" };
            var user_id = "2";
            var getlink = "http://localhost:3000/userProfiles/deleteUserFavourite?" + "product_id=" + $scope.favors[index].product[0].product_id
                + "&user_id=" + user_id;

            $http.get(getlink).
                then(function (response) {
                    console.log("get comments");
                    $scope.temp = response.data;
                    console.log('$scope.test: ' + $scope.temp.userFavourite);
                    getUserFavor();

                });

        };


       
        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };




        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };

        //add to favorite 
        $scope.addFavorite = function (index) {
            console.log("index is " + index);
            favoriteFactory.addToFavorites(index);
            $ionicListDelegate.closeOptionButtons(); // dismiss the option list
        };

    })