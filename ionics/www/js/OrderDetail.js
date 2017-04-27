angular.module('conFusion.controllers').controller('OrderDetails_controller', function ($scope,
    $stateParams, $http, $ionicPopup,$q) {

    console.log("OrderDetails_controller working");
    //console.log("productFactory.product" + productFactory.product.product_name);







    $scope.user = {};

    function getAlbums() {
        var def = $q.defer();

        $http.get("http://localhost:3000/orderItems/findOrderItemByOrder?order_id=1")
            .success(function (data) {
                service.albums = data;
                console.log(' debug data:', data);
                console.log(' debug data:', data.orderItem[0]);
                def.resolve(data);
            })
            .error(function () {
                def.reject("Failed to get albums");
            });
        return def.promise;
    }

    getOrderItem_byOrderID = function (data_orderID) {
        console.log("getOrderItem_byOrderIDs data_orderID: " + data_orderID);
        var orderID = data_orderID;

        var url = "http://localhost:3000/orderItems/findOrderItemByOrder?order_id=" + orderID;
        var defer = $q.defer();

        $http.get(url).
            then(function (response) {

                var data = response.data;
                console.log(' debug data:', data);
                console.log(' debug data:', data.orderItem[0]);

                $scope.user.orders = data.order;
                orders = data.order;
                console.log("data.orderItem[0].product_id " + data.orderItem[0].product_id);
                //return data.orderItem;
                defer.resolve(response);

            });
        return defer.promise;

    }

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
                //var temp = getOrderItem_byOrderID("1");
                //console.log("@1 order item: " + temp[0].product_id);


            });

    };
   
    bindingItem = function () {
        console.log("bindingItem");
        getOrderItem_byOrderID("1");
        var temp = getAlbums();
        


        if (orders == null) {
            return;
        }
        for (var i = 0; i < orders.length; i++) {

        }

    }
    bindingItem();


    $scope.getTest = function (data) {
        console.log("getTest");
        //alert("getTest "+data);
    }


    makeOrder = function () {
        //console.log(" $scope.user.orders.length!!!" + $scope.user.orders.length);

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

        var order_id = data_order_id;
        var product_id = $scope.product.product_id;
        var quantity = data_quantity;
        alert("order id, pr id, quantitu: " + data_order_id + "," + product_id + "," + data_quantity);


        var Indata = { "order_id": order_id, "product_id": product_id, "quantity": quantity };
        $http.post("http://localhost:3000/orderItems/newOrderItem", Indata).then(function (data, status, headers, config) {
            alert("success");
        }, function (data, status, headers, config) {
            alert("error");


        });
    };









});