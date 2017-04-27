angular.module('conFusion.controllers').controller('productDetailsController', function ($scope,
    $stateParams, $http, dish, menuFactory,
    findCommentByProduct_Factory, TestHttpFactory, get_product_by_id_Factory,
    shopProductsFactory, baseURL, productFactory, $ionicPopup, $cordovaToast, $ionicLoading, $timeout,$q) {

    console.log("productDetailsController working");
    console.log("productFactory.product" + productFactory.product.product_name);

    $scope.product = productFactory.product;


    $scope.baseURL = baseURL;

    $scope.message = "productDetailsController Loading ...";
    $scope.ratings = [{ name: 'Service', number: '4.5' }, { name: 'Food', number: '3.25987' }, { name: 'Speed', number: '1.25987' }];

    $scope.getStars = function (rating) {
   
        // Get the value
        var val = parseFloat(rating);
        // Turn value into number/100
        var size = val / 5 * 100;
        return size + '%';
    }

    var flag = 0;
    getStars_A = function (rating) {
        console.log("rating@getStars " + rating);
        while (flag == 0) {
            
        }
        // Get the value
        var val = parseFloat(rating);
        // Turn value into number/100
        var size = val / 5 * 100;
        console.log("size@: " + size);
        $scope.averageStar = size + '%';
    }

    $scope.averageScore = 0;
 


    // $scope.dish = dish; // get from resolve
    $scope.rating = {};
    $scope.rating.defaultRate = 3;
    $scope.rating.max = 5;




    $scope.commentData = {
        rating: "",
        description: "",
        user: "",
        createdAt: ""
    };
    $scope.rating_value = "3";
    $scope.rating = "";

    $scope.ratingsCallback = function (rating) {
        console.log('Selected rating is : ', rating);
        $scope.rating_value = rating;

    };


    $scope.ProductRatingsObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(7, 7, 7)',
        iconOffColor: 'rgb(200, 100, 100)',
        rating: 3.5,
        minRating: 1,
        readOnly: true,
        callback: function (rating) {
            $scope.ratingsCallback(rating);
        }
    };

    $scope.USERRatingsObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor: 'rgb(200, 100, 100)',
        rating: 3,
        minRating: 1,
        callback: function (rating) {
            $scope.USERratingsCallback(rating);
        }
    };


    $scope.USERratingsCallback = function (rating) {
        console.log('USERratingsCallback Selected rating is : ', rating);
        $scope.rating_value = rating;

    };

    getcomments();

    showMSN = function (msn) {
        $ionicPopup.alert({
            title: msn,
            template: ""
        });
    }

    $scope.groups = [{ id: 1, description: "Initial List", name: "Demo" }];

    $scope.test = '70%';
   
    $scope.loadAllMeasure = function () {
        loadData().then(function (data) {
            $scope.test.rating = $scope.getStars(3.5);
            console.log("$scope.test.rating ", $scope.test.rating);
            $scope.test = '90%';
        });
    };
    $scope.loadAllMeasure();


    function loadData() {
        var deferred = $q.defer();
        var product_id = $scope.product.product_id.toString();
        var url = "http://localhost:3000/comments/findCommentByProduct?product_id=" + product_id;
        $http.get(url).
            then(function (response) {
                $scope.temp = response.data;
                $scope.comments = response.data.comment;
                var data = $scope.comments;
                var total_score = 0;
                for (var i = 0; i < data.length; i++) {
                    total_score = total_score + parseInt(data[i].rating);
                    var UsrRatingObj = {
                        iconOn: 'ion-ios-star',
                        iconOff: 'ion-ios-star-outline',
                        iconOnColor: 'rgb(7, 7, 7)',
                        iconOffColor: 'rgb(200, 200, 200)',
                        rating: data[i].rating,
                        readOnly: true,
                        minRating: 1,
                        callback: function (rating) {
                            $scope.ratingsCallback(rating);
                        }
                    };
                    data[i].ratingObj = UsrRatingObj;
                    deferred.resolve(data);
                }
               
            });
        return deferred.promise;
    }

    function getcomments() {
        var product_id = $scope.product.product_id.toString();

        var url = "http://localhost:3000/comments/findCommentByProduct?product_id=" + product_id;
        $http.get(url).
            then(function (response) {
                console.log("get comments");
                console.log("response", response);
                $scope.temp = response.data;
                $scope.comments = $scope.temp.comment;
                var data = $scope.comments;
                var total_score = 0;
                for (var i = 0; i < data.length; i++) {
                    console.log("data[i].description " + data[i].description);
                    console.log("data[i].rating " + data[i].rating);
                    console.log("typeof data[i].rating " + typeof data[i].rating);
                    console.log("typeof data[i].rating " + typeof parseInt(data[i].rating));
                    total_score = total_score + parseInt(data[i].rating);
                    var UsrRatingObj = {
                        iconOn: 'ion-ios-star',
                        iconOff: 'ion-ios-star-outline',
                        iconOnColor: 'rgb(7, 7, 7)',
                        iconOffColor: 'rgb(200, 200, 200)',
                        rating: data[i].rating,
                        readOnly: true,
                        minRating: 1,
                        callback: function (rating) {
                            $scope.ratingsCallback(rating);
                        }
                    };

                    data[i].ratingObj = UsrRatingObj;
                    console.log("data[i].ratingObj", data[i].ratingObj);

                }
                flag = 1;
                $scope.averageScore = total_score / data.length;
                console.log("$scope.averageScore " + $scope.averageScore + "," + total_score + "," + data.length);
                getStars_A($scope.averageScore);


            });
    };




    $scope.user = {};
    $scope.makeComment = function () {
        console.log("makeComment");
        console.log("$scope.feedback " + $scope.user.feedback);
        console.log("$scope.feedback " + $scope.rating);
        var user_id = "2";
        var product_id = $scope.product.product_id.toString();


        var Indata = { "product_id": product_id, "user_id": user_id, "description": $scope.user.feedback, "rating": $scope.rating_value };
        console.log("makeComment Indata", Indata);
        $http.post("http://localhost:3000/comments/newComment/", Indata).then(function (data, status, headers, config) {

            getcomments();
            $scope.user.feedback = null;
            showMSN("success");
        }, function (data, status, headers, config) {
            showMSN("error");


        });

    };






    $scope.makeOrderP_popUp = function () {
        console.log("showPopup!");
        $scope.user = {}

        var myPopup = $ionicPopup.show({
            template: '<label class = "item item-input item-select"><div class="input-label">amount</div><select ng-model="user.orderAmount"><option ng-repeat="n in [1,2,3,4,5,6,7,8,9,10]" value="{{n}}">{{n}}</option></select></label >',
            title: 'Make order',
            subTitle: 'Please amount you want to make',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.user.orderAmount) {
                            e.preventDefault();
                        } else {
                            //alert("click :" + $scope.user.orderAmount);
                            showIonicLoading();
                            makeOrder();
                            return $scope.user.orderAmount;
                        }
                    }
                },
            ]
        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });

    };

    showIonicLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    };


    getUserOrder();

    var orders = [];
    function getUserOrder() {
        console.log("getUserOrder");
        var user_id = "2";
        var url = "http://localhost:3000/orders/findOrderByUser?user_id=" + user_id;
        $http.get(url).
            then(function (response) {

                var data = response.data;
                console.log(' debug data:', data);
                console.log(' debug data:', data.order[0]);

                $scope.user.orders = data.order;
                orders = data.order;
                console.log("data.order.length" + data.order.length);
                console.log(" $scope.user.orders.length" + $scope.user.orders.length);

                // console.log('$scope.test: '+$scope.test.description);//useful
            });
    };

    makeOrder = function () {
        //console.log(" $scope.user.orders.length!!!" + $scope.user.orders.length);
        console.log("makeOrder");
        //var orders = $scope.user.orders;
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].shop_id == $scope.product.shop_id && orders[i].status == "pending") {
                //add item into this order
                newOrderItem($scope.user.orderAmount, orders[i].order_id);

            } else {
                //make a newOrder
            }
        };
    }

    newOrder = function () {
        console.log("newOrder");
        console.log(" $scope.product name and shop_id:" + $scope.product.product_name + "," + $scope.product.shop_id);

        var status = "pending";
        var Indata = { "shop_id": "1", "user_id": "2", "status": status };
        $http.post("http://localhost:3000/orders/newOrder", Indata).then(function (data, status, headers, config) {

            alert("success");
            $ionicLoading.hide();
        }, function (data, status, headers, config) {
            alert("error");
            alert(data);
            alert(headers);
            alert(config);

        });

    };

    newOrderItem = function (data_quantity, data_order_id) {
        console.log("newOrderItem");
        console.log(" $scope.product name and shop_id:" + $scope.product.product_name + "," + $scope.product.shop_id);

        var order_id = data_order_id.toString();
        var product_id = $scope.product.product_id.toString();
        var quantity = data_quantity.toString();
        //alert("order id, pr id, quantitu: " + data_order_id + "," + product_id + "," + data_quantity);
        console.log("order id, pr id, quantitu:" + data_order_id + "," + product_id + "," + data_quantity);


        //var Indata = { "order_id": data_order_id, "product_id": product_id, "quantity": data_quantity };
        //var Indata = { "order_id": "0", "product_id": "1", "quantity": "99" };

        var Indata = { "order_id": order_id, "product_id": product_id, "quantity": quantity };
        console.log("order id, pr id, quantitu:" + data_order_id + "," + product_id + "," + data_quantity);

        $http.post("http://localhost:3000/orderItems/newOrderItem", Indata).then(function (data, status, headers, config) {
            console.log("data ", data);
            $timeout(function () {
                $ionicLoading.hide();
            }, 1000);

        }, function (data, status, headers, config) {
            alert("error");

        });


    };









});