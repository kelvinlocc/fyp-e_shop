angular.module('conFusion.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPopup) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    console.log("AppCtrl is working");


    Array.prototype.remove = function () {
        var what, a = arguments,
            L = a.length,
            ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };


    // Form data for the login modal

    $scope.loginData = $localStorage.getObject('userinfo', '{}');
    function getUserInfo() {
        console.log("getUserInfo");
        $scope.loginData = $localStorage.getObject('userinfo', '{}');
    }

    $scope.reservation = {};
    $scope.isLogin = {};

    $scope.fa = [];
    $scope.commentList = [];
    $scope.allprofuct_list = [];

    $scope.commentData = {
        rating: "",
        description: "",
        user: "",
        createdAt: ""
    };
    $scope.addComment = function (commentObj) {

        $scope.commentList.push(commentObj);

    };


    $scope.getallprofuct_list = function () {
        for (var i = 0; i < 3; i++) {
            if (i == 0) {
                $scope.product = {
                    name: "blue towel cup",
                    price: "100$",
                    description: "this is good blue towel, come to buy it!",
                    image: "img/Product01.jpg"
                }
            }
            if (i == 1) {
                $scope.product = {
                    name: "yellow towel",
                    price: "101$",
                    description: "this is good towel, come to buy it!",
                    image: "img/Product02.jpg"

                }
            }

            if (i == 2) {
                $scope.product = {
                    name: "medal",
                    price: "153$",
                    description: "this is prize, come to buy it!",
                    image: "img/Product03.jpg"

                }

            }
            $scope.allprofuct_list.push($scope.product);
        }
        return $scope.allprofuct_list;

        for (var i = 0; i < $scope.allprofuct_list.length; i++) {
            console.log("name " + $scope.allprofuct_list[i].name);
        }
    };


    $scope.getFa = function () {
        return $scope.fa;
    };

    $scope.addFa = function (i) {
        console.log("addFa");
        $scope.fa.push($scope.allprofuct_list[i]);

    };

    $scope.removeFa = function (i) {
        console.log("my_function addFa" + i);
        $scope.fa.splice(i, 1);;
    };


    $scope.getUserName = function () {
        // console.log("getUserName");
        // console.log('getUserName(): ' + $scope.loginData.username);
        var tempDate = $localStorage.getObject('userinfo', '{}');
        if (tempDate.username.length == 0) {
            return 'Guest';
        }
        return tempDate.username;
    };

    $scope.getUserEmail = function () {
        var tempDate = $localStorage.getObject('userinfo', '{}');
        return tempDate.email;
    };

    function checkLoginUserInfo() {
        var tempDate = $localStorage.getObject('userinfo', '{}');
        $scope.loginData = tempDate;

        console.log("tempDate @controller.js" + tempDate.email + "," + tempDate.username + "," + tempDate.password);
    };


    $scope.isLogin = function () {
        // return false;
         //console.log('isLogin: ' + $scope.getUserName());
        if ($scope.getUserName() == "Guest") {
            //console.log("islogin false")
            return false;
        } else {
            //console.log("islogin true")
            return true;
        }

    };


    //-01 Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    $scope.sample = 'sample test';
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing loginData.username' + $scope.loginData.username);
        console.log('Doing loginData' + $scope.loginData);
        // console.log('Doing login', loginData);
        $localStorage.storeObject('userinfo', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        // $scope.sample = 'sample test';
        // $timeout(function () {
        //     $scope.closeLogin();
        // }, 1000);
    };

    $scope.resetUser = function () {
        $scope.loginData = {
            username: 'username',
            password: '123'
        };
        $localStorage.storeObject('userinfo', $scope.loginData);

    }
    $scope.doLogoff = function () {
        //  $scope.loginData= {username:'username',password:'123'};

        console.log('before', $scope.loginData);
        console.log('Doing loginData.username' + $scope.loginData.username);
        console.log('Doing loginData.password' + $scope.loginData.password);
        console.log('Doing loginData.password' + $scope.loginData.confirm_password);

        $scope.loginData.username = '';
        $scope.loginData.password = '';
        $scope.loginData.confirm_password = '';
        $scope.loginData.email = '';
        console.log('after', $scope.loginData);

        console.log('Doing loginData.username' + $scope.loginData.username);
        console.log('Doing loginData.password' + $scope.loginData.password);

        $localStorage.storeObject('userinfo', $scope.loginData);

        // $timeout(function () {
        //     $scope.closeLogin();
        // }, 1000);
    };


    $ionicModal.fromTemplateUrl('templates/makeOorder.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.makeOorderform = modal;
    });

    // Triggered in the reserve modal to close it
    $scope.closemakeOorder = function () {
        $scope.makeOorderform.hide();
    };

    // Open the reserve modal
    $scope.makeOorder = function () {

        $scope.makeOorderform.show();
    };

    // Perform the reserve action when the user submits the reserve form
    $scope.doReserve = function () {
        console.log('Doing reservation', $scope.reservation);

        // Simulate a reservation delay. Remove this and replace with your reservation
        // code if using a server system
        $timeout(function () {
            $scope.closeReserve();
        }, 1000);
    };



    //-02 controler for reserve table
    // Create the reserve modal that we will use later
    $ionicModal.fromTemplateUrl('templates/reserve.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.reserveform = modal;
    });

    // Triggered in the reserve modal to close it
    $scope.closeReserve = function () {
        $scope.reserveform.hide();
    };

    // Open the reserve modal
    $scope.reserve = function () {

        $scope.reserveform.show();
    };

    // Perform the reserve action when the user submits the reserve form
    $scope.doReserve = function () {
        console.log('Doing reservation', $scope.reservation);

        // Simulate a reservation delay. Remove this and replace with your reservation
        // code if using a server system
        $timeout(function () {
            $scope.closeReserve();
        }, 1000);
    };


    //03 controll for sign up
    $ionicModal.fromTemplateUrl('templates/signUp.html', {
        scope: $scope,

    }).then(function (modal) {
        $scope.signUpForm = modal;
    });

    // Triggered in the reserve modal to close it
    $scope.closeSignUpForm = function () {
        $scope.signUpForm.hide();

    };

    // Open the reserve modal
    $scope.signUp = function () {
        $scope.signUpForm.show();
        $scope.modal.hide();
    };


    //04 controll for sign up
    $ionicModal.fromTemplateUrl('templates/comment.html', {
        scope: $scope,

    }).then(function (modal) {
        $scope.commentForm = modal;


    });

    // Triggered in the reserve modal to close it
    $scope.commentClose = function () {
        $scope.commentForm.hide();

    };

    // Open the reserve modal
    $scope.comment = function () {
        $scope.commentForm.show();
        $scope.temp = "temp2";
        $scope.rating = {};
        $scope.rating.rate = 3;
        $scope.rating.max = 5;
        $scope.temp = "436546";
        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',
            iconOff: 'ion-ios-star-outline',
            iconOnColor: 'rgb(200, 200, 100)',
            iconOffColor: 'rgb(200, 100, 100)',
            rating: 2,
            minRating: 1,
            callback: function (rating) {
                $scope.ratingsCallback(rating);
            }
        };
        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
        };


    };


    //test:
    // Triggered on a button click, or some other target

    $scope.showPopup2 = function () {
        $scope.data = {};
        $scope.rating = {};
        $scope.rating.rate = 3;
        $scope.rating.max = 5;
        $scope.temp_rating = "1";
        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',
            iconOff: 'ion-ios-star-outline',
            iconOnColor: 'rgb(200, 200, 100)',
            iconOffColor: 'rgb(200, 100, 100)',
            rating: 2,
            minRating: 1,
            callback: function (rating) {
                $scope.ratingsCallback(rating);
            }
        };
        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
            $scope.temp_rating = rating;
        };
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: ' <rating ng-model="rating.rate" max="rating.max"></rating><ionic-ratings ratingsobj="ratingsObject"></ionic-ratings><input type="text" ng-model="loginData.username" placeholder="leave your comment...">',
            //              templateUrl: '/templates/comment.html',
            cssClass: 'my-custom-popup',
            scope: $scope,

            title: 'Comment',
            //    subTitle: '123<rating ng-model="rating.rate" max="rating.max"></rating><ionic-ratings ratingsobj="ratingsObject"></ionic-ratings>',
            buttons: [{
                text: 'Cancel'
            },
            {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function (e) {
                    console.log("my_function pop up" + $scope.loginData.username);
                    if (!$scope.loginData.username) {
                        //don't allow the user to close unless he enters wifi password

                        e.preventDefault();
                    } else {
                        $scope.temp = {
                            rating: $scope.temp_rating,
                            description: $scope.loginData.username,
                            user: "testing user",
                            //   createdAt:   $scope.date = new Date()
                            createdAt: new Date()
                        };
                        console.log("my_function pop up rating " + $scope.temp.rating);
                        console.log("my_function pop up description" + $scope.temp.description);
                        $scope.addComment($scope.temp);
                        return $scope.loginData.username;
                    }
                }
            }
            ]

        });

        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
    };




})

    .controller('user_profile_control', function ($scope, $localStorage, $rootScope) {
        console.log('user_profile_control start');
        $scope.loginData = $localStorage.getObject('userinfo', '{}');

        // $scope.$watch(function () { return $scope.loginData }, function (newVal, oldVal) {
        //     if (typeof newVal !== 'undefined') {
        //         // console.log('$watch ')
        //         // $scope.loginData = $localStorage.getObject('userinfo', '{}');
        //     }
        // });
    })


    // expandable list:
    .controller('expandable_list_control', function ($scope, $localStorage) {
        // Console.log("MyCtrl start:");
        console.log('expandable_list_control start');
        $scope.loginData = $localStorage.getObject('userinfo', '{}');

        // $scope.$watch(function () { return $scope.loginData }, function (newVal, oldVal) {
        //     if (typeof newVal !== 'undefined') {
        //         // console.log('$watch ')
        //         // $scope.loginData = $localStorage.getObject('userinfo', '{}');
        //     }
        // })

        $scope.groups = [];
        for (var i = 0; i < 1; i++) {
            $scope.groups[i] = {
                name: 'Shops',
                stationary_shops: [],
                seasonal_shops: [],
                show: false
            };

            $scope.groups[i].stationary_shops.push('Souvenir shop');
            $scope.groups[i].stationary_shops.push('book shop');
            $scope.groups[i].stationary_shops.push('parknshop');
            $scope.groups[i].stationary_shops.push('Mega hair');

            for (var j = 0; j < 5; j++) {
                $scope.groups[i].seasonal_shops.push('seasonal shop ' + j);
            }
        }

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function (group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function (group) {
            return group.show;
        };

    })




    .controller('ProductListsCtrl', function ($scope) {
        $scope.playlists = [{
            title: 'proudct01',
            id: 1
        },
        {
            title: 'proudct02',
            id: 2
        },
        {
            title: 'proudct03',
            id: 3
        },
        {
            title: 'proudct04',
            id: 4
        },
        {
            title: 'proudct05',
            id: 5
        },
        {
            title: 'proudct06_1',
            id: 6
        }
        ];
    })


    // home news list 
    //.controller('homeNewsList_controller', function ($scope) {
    //  $scope.newsList = [{
    //      title: '15%Off For every purchase Over $200',
    //      id: 1
    //    },
    //    {
    //      title: 'premiun itens are 70% off or more!',
    //      id: 2
    //    },
    //    {
    //      title: 'tee starts from $30, sovenirs up to 50%off!',
    //      id: 3
    //    }
    //  ];
    //})


    .controller('seasonalStore_controller', function ($scope) {
        $scope.shopList = [{
            imageSource: 'img/starbuck_poster.jpg',
            id: 1
        },
        {
            imageSource: 'img/starbuck_poster2.jpg',
            id: 2
        },
        {
            imageSource: 'img/starbuck_poster_3.jpg',
            id: 3
        },
        {
            imageSource: 'img/starbuck_poster2.jpg',
            id: 4
        }
        ];
    })

    .controller('seasonalStoreDetails_controller', function ($scope) {
        $scope.shopList = [{
            imageSource: 'img/ionic.png',
            id: 1
        },
        {
            imageSource: 'img/james.jpg',
            id: 2
        },
        {
            imageSource: 'img/seven.png',
            id: 3
        },
        {
            imageSource: 'img/symbol.jpg',
            id: 4
        }
        ];
    })

    .controller('e_coupon_controller', function ($scope) {
        $scope.e_couponList = [{
            imageSource: 'img/ionic.png',
            id: 1
        },
        {
            imageSource: 'img/james.jpg',
            id: 2
        },
        {
            imageSource: 'img/seven.png',
            id: 3
        },
        {
            imageSource: 'img/symbol.jpg',
            id: 4
        }
        ];
    })

    .controller('myProfile_controller', function ($scope) {
        $scope.myProfile_List = [{
            name: 'My Favorite',
            imageSource: 'img/ionic.png',
            id: 1
        },
        {
            name: 'My Shopping Cart',
            imageSource: 'img/james.jpg',
            id: 2
        },
        {
            name: 'My Orders',
            imageSource: 'img/seven.png',
            id: 3
        },
        {
            name: 'My Booking',
            imageSource: 'img/symbol.jpg',
            id: 4
        },
        {
            name: 'Change Password',
            imageSource: 'img/symbol.jpg',
            id: 5
        },
        {
            name: 'Allow Notifications',
            imageSource: 'img/symbol.jpg',
            id: 6
        }


        ];
    })





    // dishes and favorites are supply by app.js favorites controller's resolve
    .controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory',
        'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function
            ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup,
            $ionicLoading, $timeout) {

        $scope.baseURL = baseURL;
        $scope.shouldShowDelete = false;

        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading...'
        });


        $scope.favorites = favorites; // from resolve

        $scope.dishes = dishes;

        $timeout(function () { // additional timeout
            $ionicLoading.hide();
        }, 1000);


        console.log($scope.dishes, $scope.favorites);

        $scope.toggleDelete = function () {
            $scope.shouldShowDelete = !$scope.shouldShowDelete;
            console.log($scope.shouldShowDelete);
        }

        $scope.deleteFavorite = function (index) {


            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm Delete',
                template: 'Are you sure you want to delete this item?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Ok to delete');
                    favoriteFactory.deleteFromFavorites(index);
                } else {
                    console.log('Canceled delete');
                }
            });

            //        favoriteFactory.deleteFromFavorites(index);
            $scope.shouldShowDelete = false;

        }
    }])
    .filter('favoriteFilter', function () {
        // dishes is an array type
        return function (dishes, favorites) {
            var out = []; // javascript array
            for (var i = 0; i < favorites.length; i++) {
                for (var j = 0; j < dishes.length; j++) {
                    if (dishes[j].id === favorites[i].id)
                        out.push(dishes[j]);
                }
            }
            return out;

        }
    })





    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [{
            title: 'Reggae',
            id: 1
        },
        {
            title: 'Chill',
            id: 2
        },
        {
            title: 'Dubstep',
            id: 3
        },
        {
            title: 'Indie',
            id: 4
        },
        {
            title: 'Rap',
            id: 5
        },
        {
            title: 'Cowbell',
            id: 6
        }
        ];
    })

    // new introduced controler 
    //
    //
    .controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', function ($scope, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {
        $scope.baseURL = baseURL;
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";

        $scope.dishes = menuFactory.query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });


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

    }])

 



    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };

        var channels = [{
            value: "tel",
            label: "Tel."
        }, {
            value: "Email",
            label: "Email"
        }];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

        $scope.sendFeedback = function () {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                feedbackFactory.save($scope.feedback);
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])


    .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'baseURL', function ($scope, $stateParams, dish, menuFactory, baseURL) {
        $scope.baseURL = baseURL;
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading ...";

        $scope.dish = dish; // get from resolve


    }])


    .controller('productDetailsController', ['$scope', '$stateParams',
        '$http', 'dish', 'menuFactory', 'findCommentByProduct_Factory',
        'TestHttpFactory', 'get_product_by_id_Factory', 'shopProductsFactory',
        'baseURL', function ($scope, $stateParams, $http, dish, menuFactory,
            findCommentByProduct_Factory, TestHttpFactory, get_product_by_id_Factory, shopProductsFactory, baseURL) {
        $scope.baseURL = baseURL;
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "productDetailsController Loading ...";
        console.log('$scope.sample: ' + $scope.sample);

        // $scope.dish = dish; // get from resolve
        $scope.rating = {};
        $scope.rating.rate = 3;
        $scope.rating.max = 5;

        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',
            iconOff: 'ion-ios-star-outline',
            iconOnColor: 'rgb(200, 200, 100)',
            iconOffColor: 'rgb(200, 100, 100)',
            rating: 2,
            minRating: 1,
            callback: function (rating) {
                $scope.ratingsCallback(rating);
            }
        };

        $scope.commentData = {
            rating: "",
            description: "",
            user: "",
            createdAt: ""
        };
        $scope.rating = "";
        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
            $scope.rating = rating;

        };

        function getD() {

        }


        function getcomments() {
            $http.get('http://localhost:3000/comments/findCommentByProduct?product_id=1').
                then(function (response) {

                    $scope.temp = response;
                    console.log('$scope.test: ' + $scope.temp[0].product_name);

                    // console.log('$scope.test: '+$scope.test.description);//useful
                });
        };

        // $scope.test = $scope.temp;
        // $scope.comments = get_product_by_id_Factory.query(
        //   function (response) {
        //     $scope.comments = response;
        //     console.log('$scope.product[0].description: ' + $scope.product[0].description);
        //     $scope.showMenu = true;
        //   },
        //   function (response) {
        //     $scope.message = "Error: " + response.status + " " + response.statusText;
        //   });
        $scope.comments = $scope.commentList;


        $scope.addComment();

        $scope.products = $scope.getallprofuct_list();



    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);

            $scope.dish.comments.push($scope.mycomment);
            menuFactory.getDishes().update({ // need to modify
                id: $scope.dish.id
            }, $scope.dish);

            $scope.commentForm.$setPristine();

            $scope.mycomment = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
        }



    }])



    .controller('ProductCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);

            $scope.dish.comments.push($scope.mycomment);
            menuFactory.getDishes().update({ // need to modify
                id: $scope.dish.id
            }, $scope.dish);

            $scope.commentForm.$setPristine();

            $scope.mycomment = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
        }

        $scope.rating = {};
        $scope.rating.rate = 3;
        $scope.rating.max = 5;

        $scope.ratingsObject = {
            iconOn: 'ion-ios-star',
            iconOff: 'ion-ios-star-outline',
            iconOnColor: 'rgb(200, 200, 100)',
            iconOffColor: 'rgb(200, 100, 100)',
            rating: 2,
            minRating: 1,
            callback: function (rating) {
                $scope.ratingsCallback(rating);
            }
        };

        $scope.ratingsCallback = function (rating) {
            console.log('Selected rating is : ', rating);
        };



    }])




    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL) {

        $scope.baseURL = baseURL;
        $scope.leader = corporateFactory.get({
            id: 3
        });
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.get({
            id: 0
        })
            .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );
        $scope.promotion = promotionFactory.get({
            id: 0
        });

    }])



    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.leaders = corporateFactory.query(
            function (response) {
                $scope.leaders = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
        console.log($scope.leaders);

    }])

    .controller('stationaryStore_controller', ['$scope', 'corporateFactory', 'shopFactory',
        'shopProductsFactory', 'baseURL', function ($scope, corporateFactory, shopFactory, shopProductsFactory, baseURL) {
        $scope.baseURL = baseURL;

        $scope.leaders = corporateFactory.query(
            function (response) {
                $scope.leaders = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.shops = shopFactory.query(
            function (response) {
                $scope.shops = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.products = shopProductsFactory.query(
            function (response) {
                $scope.products = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });



        console.log($scope.leaders);

    }])

    

    .controller('myShoppingCart_controller', ['$scope', 'corporateFactory', 'shopFactory', 'shopProductsFactory',
        'baseURL', function ($scope, corporateFactory, shopFactory, shopProductsFactory, baseURL) {
        $scope.baseURL = baseURL;

        $scope.leaders = corporateFactory.query(
            function (response) {
                $scope.leaders = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.shops = shopFactory.query(
            function (response) {
                $scope.shops = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.products = shopProductsFactory.query(
            function (response) {
                $scope.products = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.calculateTotalPrice = function () {
            var total = 0;
            for (var i = 0; i < $scope.products.length; i++) {
                total = total + parseFloat($scope.products[i].price);

            }
            return total;
        };



        console.log($scope.leaders);

    }])

    // check validation
    .controller('SignInCtrl', function ($scope, $state) {
        $scope.user = {
            username: '',
            password: ''
        };
        $scope.signIn = function (form) {
            console.log(form);
            if (form.$valid) {
                console.log('Sign-In', $scope.user.username);
                $state.go('tabs.home');
            }
        };

    })


    .controller('login_control', function ($scope, $stateParams) {


        $scope.checkEmail = function ValidateEmail(mail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return (false)
        }





    })

    .controller('signUp_control', function ($scope, $stateParams) {



    })

    .controller('forgetPassword_control', function ($scope, $stateParams) {



    })

    .controller('changePassword_control', function ($scope, $stateParams) {



    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) { });
