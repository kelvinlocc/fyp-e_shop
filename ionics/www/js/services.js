'use strict';

angular.module('conFusion.services', ['ngResource'])
    //.constant("baseURL", "http://localhost:3000/") //change this to adpate the live server
    .constant("baseURL", "http://34.208.168.170:3000/") //change this to adpate the live server
    //** ip: http://192.168.0.108/
    //"http://192.168.0.100:3000/" //ipconfig
    .factory('getPoster', ['$resource', 'baseURL', function ($resource, baseURL) {
        // "comments/findCommentByProduct/:product_id"
        return $resource(baseURL + "comments/findCommentByProduct?product_id=/:product_id", null, {
            'update': {
                method: 'GET'
            }
        });

    }])

    .factory('Utils', function ($q) {
        return {
            isImage: function (src) {
                var deferred = $q.defer();

                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = src;

                return deferred.promise;
            }
        };
    })



    .factory('findCommentByProduct_Factory', ['$resource', 'baseURL', function ($resource, baseURL) {
        // "comments/findCommentByProduct/:product_id"
        return $resource(baseURL + "posters?", null, {
            'update': {
                method: 'PUT'
            }
        });

    }])

    .factory('TestHttpFactory', function ($http) {
        return function (id) {
            return $http({
                method: 'GET',
                url: 'comments/findCommentByProduct?product_id=product_id',
                params: { product_id: product_id }
            });

        }
    })



    .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

    }])


    .factory('get_shops_Factory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "shops", null, {
            'update': {
                method: 'GET'
            }
        });
    }])

    .factory('get_product_by_id_Factory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "comments/findCommentByProduct?product_id=1", null, {
            'update': {
                method: 'GET'
            }
        });
    }])



    .factory('shopProductsFactory', ['$resource', 'baseURL',
        function ($resource, baseURL) {
        return $resource(baseURL + "products", null, {
            'update': {
                method: 'GET'
            }
        });

    }])


    .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "promotions/:id");

    }])


    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "leadership/:id");

    }])

    .factory('shopFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "shops/:id");

    }])


    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        return $resource(baseURL + "feedback/:id");

    }])

    .factory('Data', function () {
        var selectedProduct = {};
        return {
            getSelectedProduct: function () {
                return selectedProduct;
            },
            setSelectedProduct: function (userparameter) {
                console.log("selectedProduct +name " + userparameter.product_name);
                selectedProduct = userparameter;
            }
        };
    })

    .factory('Data2', function () {
        var favFac = {};
        var data = {};
        favFac.setSelectedProduct = function (temp_data) {
            console.log("selectedProduct +name " + temp_data.product_name);

            data = temp_data;
        }

       

        favFac.getSelectedProduct = function () {
            return data;
        };

        return favFac;
    })

    .factory('productFactory', function () {
        return { product: '' };
    })



    .factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
        var favFac = {};
        var favorites = []; // array id of favurite 

        favFac.addToFavorites = function (index) {
            for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].id == index)
                    return;
            }
            favorites.push({ // favorite object with
                id: index
            });
        };

        favFac.deleteFromFavorites = function (index) {
            for (var i = 0; i < favorites.length; i++) {
                if (favorites[i].id == index) {
                    favorites.splice(i, 1);
                }
            }
        }

        favFac.getFavorites = function () {
            return favorites;
        };

        return favFac;
    }])

    .factory('$localStorage', ['$window', function ($window) {
        return {
            store: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            storeObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
                return JSON.parse($window.localStorage[key] || defaultValue);
            }
        }
    }])


    ;