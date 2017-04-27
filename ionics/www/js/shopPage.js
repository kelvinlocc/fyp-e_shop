angular.module('conFusion.controllers').controller('shopPage_controller',
    function($scope, favoriteFactory, corporateFactory, shopFactory,
        shopProductsFactory, get_shops_Factory,
        baseURL, $localStorage, productFactory, $http, Utils, $cordovaToast) {


       


        console.log("shopPage_controller started...");
        getUserFavor();
        $scope.user = {};

   

        var userFavorList = [];
        $scope.baseURL = baseURL;

        $scope.productClick = function (data) {
            console.log("productClick data.product_name " + data.product_name);
            productFactory.product = data;

            console.log("Fact.Field " + productFactory.product.product_name);

        };


        $scope.getFavorBar = function (product_id) {

            if (isProductInFavorList(product_id)) {
                return "w3-container w3-light-grey";
            } else {
                return "w3-container w3-light-blue";

            }
        };
        $scope.getFavorBtn = function (product_id) {

            if (isProductInFavorList(product_id)) {
                return "w3-button w3-block w3-dark-grey";
            } else {
                return "w3-button w3-block w3-blue";

            }
        };
        $scope.getFavor = function (product_id) {

            if (isProductInFavorList(product_id)) {
                //return "button button-icon icon ion-heart custom-heart_icon";
                return "unlike";
            } else {
                return "like";
            }
        };

       
        $scope.getProduct = function () {
            $scope.products = shopProductsFactory.query(
                function (response) {
                    console.log("$scope.products");
                    $scope.products = response;                   

                    for (var i = 0; i < $scope.products.length; i++) {
                      
                        console.log("$scope.product[i].product_name " + $scope.products[i].product_id);
                        $scope.products[i].favor = $scope.getFavor($scope.products[i].product_id);

                        $scope.products[i].favor_bar = $scope.getFavorBar($scope.products[i].product_id);
                        $scope.products[i].favor_btn = $scope.getFavorBtn($scope.products[i].product_id);

                        $scope.products[i].imagePath = "http://localhost:3000/products/openImage?product_id=" + $scope.products[i].product_id;
                        $scope.products[i].imagePath_width = "250";
                        console.log(" $scope.products[i].imagePath " + $scope.products[i].imagePath);

                    };
                    $scope.products_p = [];
                    for (var i = 0; i < $scope.products.length; i++) {
                        console.log("$scope.product[i].product_name " + $scope.products[i].product_name);
                        
                        console.log("$scope.product[i].favor " + $scope.products[i].favor + "$scope.products[i].imagePath " + $scope.products[i].imagePath);
                        if ($scope.products[i].on_sale="1") {
                            $scope.products_p.push($scope.products[i]);
                        }
                    };
                    $scope.showMenu = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
        };

        $scope.getProduct();



        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
        };



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



        $scope.updateFavor = function ($event, product_id) {
            $event.preventDefault();
            if (isProductInFavorList(product_id)) {
                removeFavor(product_id);
            } else {
                addFavor(product_id);
            }
        }

        isProductInFavorList = function (product_id) {
            for (var i = 0; i < userFavorList.length; i++) {
                //console.log("user favor product name and id " + userFavor[i].product[0].product_name + "," + userFavor[i].product[0].product_id);
                if (product_id == userFavorList[i]) {
                    return true;
                }

            }
            return false;
        }

        removeFavor = function (product_id) {
            //alert("removeFavor");

            console.log("removeFavor() @product_id " + product_id);

            var user_id = 2;

            var getlink = "http://localhost:3000/userProfiles/deleteUserFavourite?" + "product_id=" + product_id + "&user_id=" + user_id;
            console.log("getLink" + getlink);
            $http.get(getlink).
                then(function (response) {
                    console.log("get comments");
                    $scope.temp = response.data;
                    console.log('$scope.test: ' + $scope.temp.userFavourite);
                    getUserFavor();

                });


        };

        addFavor = function (product_id) {
            //alert("addFavor");
            console.log("addFavor() @product_id" + product_id);
            var user_id = "2";
            var Indata = { "product_id": product_id, "user_id": user_id };

            $http.post("http://localhost:3000/userProfiles/newUserFavourite", Indata).then(function (data, status, headers, config) {
                //alert("success");
                getUserFavor();


            }, function (data, status, headers, config) {
                //alert("error");
                

            });
        };



        function getUserFavor() {
            var user_id = "2";
            var link = "http://localhost:3000/userProfiles/findUserFavouritesByUser?user_id=" + user_id;
            $http.get(link).
                then(function (response) {
                    console.log("get favor");
                    var data = response.data;
                    console.log("res", response);
                    $scope.user.userFavor = data.userFavourite;

                    var userFavor = $scope.user.userFavor;
                    userFavorList = [];
                    for (var i = 0; i < userFavor.length; i++) {
                        console.log("user favor product name and id " + userFavor[i].product[0].product_name + "," + userFavor[i].product[0].product_id);
                        userFavorList.push(userFavor[i].product[0].product_id);

                    }
                    $scope.getProduct();
                    // console.log('$scope.test: '+$scope.test.description);//useful
                });
        };

        $scope.getProductImage = function (p_id) {
            //var user_id = "2";
            var link = "http://localhost:3000/products/openImage?product_id=" + p_id;
            $http.get(link).
                then(function (response) {
                    console.log("get favor");
                    console.log("response", response);

                    return response.da
                    // console.log('$scope.test: '+$scope.test.description);//useful
                });
        };





    });