angular.module('conFusion.controllers').controller('myOrders_controller', function ($scope,
    $stateParams, $http, $ionicPopup,$q) {

    console.log("myOrders_controller working");
    //console.log("productFactory.product" + productFactory.product.product_name);







    $scope.user = {};


   
  


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
                for (var i = 0; i < orders.length; i++) {

                    for (var j = 0; j < orders[i].items.length;j++){
                        console.log("item name" + orders[i].items[j].product[0].product_name + "," + orders[i].items[j].product[0].product_id);
                        orders[i].items[j].imagePath = "http://localhost:3000/products/openImage?product_id=" + orders[i].items[j].product[0].product_id;
                        console.log(" orders.items[j].imagePath " + orders[i].items[j].imagePath);
                    }
                }
                $scope.user.orders = orders;
                //orders.push(orders[0].order_id="200");
           

            });

    };

    $scope.getTotalAmount = function (items) {
        //console.log("items: ", items);
        //console.log("getTotalAmount ", items.order_id.items);
        //console.log("getTotalAmount:@ ", items[0].updatedAt);
        
        var total = 0;
        var obj = [];
        obj = items;

        for (var i = 0; i < obj.length; i++) {
            total = total + parseFloat(items[i].quantity) * parseFloat(items[i].product[0].price);
        }

        //for (var i = 0; i < items.length; i++){
        //    total = total + parseFloat(items[i].quantity) * parseFloat(items[i].product[0].price);
        //}
        return total;
        
    }
    
  


    $scope.deleteOrder = function (order) {
        $scope.data = {}

        // Custom popup
        var myPopup = $ionicPopup.show({
            template: 'Are you confirm to delete this order from ' + order.shop[0].shop_name+"?",
            title: 'Confirm removal',
            //subTitle: 'Subtitle',
            scope: $scope,

            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Delete</b>',
                    type: 'button-positive',
                    onTap: function (e) {

                        if (!$scope.data.model) {
                            //don't allow the user to close unless he enters model...
                            e.preventDefault();
                        } else {
                            return $scope.data.model;
                        }
                    }
                }
            ]
        });

        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
    };

    $scope.deleteOrder_ITEMS_popup = function (item) {
        $scope.data = {}

        // Custom popup
        var myPopup = $ionicPopup.show({
            template: 'Are you confirm to delete this item : ' + item.product[0].product_name + " x " + item.quantity+"?",
            title: 'Confirm delete',
            //subTitle: 'Subtitle',
            scope: $scope,

            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Delete</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        deleteOrder_ITEMS(item.item_id);
                        if (!$scope.data.model) {
                            //don't allow the user to close unless he enters model...
                            //e.preventDefault();
                        } else {
                            deleteOrder_ITEMS(item.item_id);
                            return $scope.data.model;
                        }
                    }
                }
            ]
        });

        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
    };

    deleteOrder_ITEMS = function (item_id) {
        console.log("deleteOrder_ITEMS @" + item_id);
        //alert("deleteOrder_ITEMS @" + item_id);
        //var item_id = "2";

        var url = "http://localhost:3000/orderItems/deleteOrderItem?item_id=" + item_id;

        $http.get(url).
            then(function (response) {

                var data = response.data;
                console.log(' debug data:', data);
                getUserOrder();
                //console.log(' debug data:', data.order[0]);

                //$scope.user.orders = data.order;
                //orders = data.order;
                //orders.push(orders[0].order_id="200");


            });
    }
    showMSN = function (msn) {
        $ionicPopup.alert({
            title: msn,
            template: ""
        });
    }

    $scope.updateOrder = function (order) {
        console.log("updateOrder");
        console.log(" order: " ,order);
        var user_id = "2";
        if (order.status == "pending") {
            var status = "completed";

        } else {
            var status = "pending";
        }
        console.log("status " + status);
        var Indata = { "shop_id": order.shop_id.toString(), "user_id": user_id, "status": status, "order_id": order.order_id.toString() };
        console.log("indata ", Indata);
        $http.post("http://localhost:3000/orders/updateOrder", Indata).then(function (data, status, headers, config) {
            showMSN("success");

            console.log("return data ", data);
            //alert("return data ", data);
            getUserOrder();
        }, function (data, status, headers, config) {




        });
    }

    $scope.getStatusForButton = function (status) {
        console.log("getStatusForButton status " + status);
        if (status == "pending") {
            return "process...";
        } else {
            return "redraw";
        }
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
            showMSN("success");
            
        }, function (data, status, headers, config) {
            showMSN("error");
         
        });

    };

    newOrderItem = function (data_quantity, data_order_id) {
        console.log("newOrderItem");
        console.log(" $scope.product name and shop_id:" + $scope.product.product_name + "," + $scope.product.shop_id);

        var order_id = data_order_id;
        var product_id = $scope.product.product_id;
        var quantity = data_quantity;


        var Indata = { "order_id": order_id, "product_id": product_id, "quantity": quantity };
        $http.post("http://localhost:3000/orderItems/newOrderItem", Indata).then(function (data, status, headers, config) {
            showMSN("success");
            
        }, function (data, status, headers, config) {
            showMSN("error");


        });
    };









});