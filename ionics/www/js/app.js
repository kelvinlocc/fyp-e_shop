// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('conFusion', ['ionic', 'ngCordova', 'conFusion.controllers', 'conFusion.services', 'ionic-ratings',
"ng","ngAnimate","ngAria",'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      $timeout(function () {
        $cordovaSplashscreen.hide();
      }, 2000);

    });

    //tricggle when status change
    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading ...'
      })
    });

    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
      console.log('Loading ...');
      $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      console.log('done');
      $rootScope.$broadcast('loading:hide');
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      //test for validation
      // .state('signin', {
      //     url: '/sign-in',
      //     templateUrl: 'templates/sample_login.html',
      //     controller: 'SignInCtrl'
      // })

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/slidebar.html',
        controller: 'AppCtrl'
        // controller: 'MyCtrl'
      })

      .state('app.aboutus', {
        url: '/aboutus',
        views: {
          'mainContent': {
            templateUrl: 'templates/reserve.html',
            controller: 'AboutController'
          }
        }
      })

    //   .state('app.menu', {
    //     url: '/menu',
    //     views: {
    //       'mainContent': {
    //         templateUrl: 'templates/menu.html',
    //         controller: 'MenuController' // PlaylistsCtrl
    //       }
    //     }
    //   })

      .state('app.dishdetail', {
        url: '/menu/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/dishdetail.html',
            controller: 'DishDetailController', // PlaylistsCtrl
            resolve: {
              dish: ['$stateParams', 'menuFactory', function ($stateParams, menuFactory) {
                return menuFactory.get({
                  id: parseInt($stateParams.id, 10)
                });
              }]
            }
          }
        }
      })



      .state('app.myFavourite', {
        url: '/myProfile/myFavourite',
        views: {
          'mainContent': {
            templateUrl: 'templates/myFavourite.html',
            controller: 'myFavorController'
          }
        }
      })

      .state('app.productDetails', {
        // url: '/myProfile/myFavourite/:id',
        url: '/myProfile/myFavourite/productDetails',
        //  url: '/shopPage/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/productDetails.html',
            controller: 'productDetailsController', // PlaylistsCtrl
            resolve: {
              dish: ['$stateParams', 'menuFactory', function ($stateParams, menuFactory) {
                id = parseInt($stateParams.id, 10);
                console.log('$stateParams.id: ' + $stateParams.id);
                return "id";
                // return menuFactory.get({
                // id= parseInt($stateParams.id, 10)
                // });
              }]
            }
          }
        }
      })


      .state('app.comment', {
        url: '/comment',
        views: {
          'mainContent': {
            templateUrl: 'templates/comment.html',
            controller: 'ProductCommentController', // PlaylistsCtrl
            resolve: {
              dish: ['$stateParams', 'menuFactory', function ($stateParams, menuFactory) {
                return menuFactory.get({
                  id: parseInt($stateParams.id, 10)
                });
              }]
            }
          }
        }
      })




      .state('app.myShoppingCart', {
        url: '/myProfile/myShoppingCart',
        views: {
          'mainContent': {
            templateUrl: 'templates/myShoppingCart.html',
            controller: 'myShoppingCart_controller'
          }
        }
      })

      .state('app.myOrders', {
        url: '/myProfile/myOrders',
        views: {
          'mainContent': {
              templateUrl: 'templates/myOrders.html',
              controller: 'myOrders_controller'
          }
        }
      })

      .state('app.myBooking', {
        url: '/myProfile/myBooking',
        views: {
          'mainContent': {
            templateUrl: 'templates/myBooking.html'
          }
        }
      })
        .state('app.OrdersDetails', {
            url: '/myProfile/OrdersDetails',
            views: {
                'mainContent': {
                    templateUrl: 'templates/OrdersDetails.html',
                    controller: 'OrderDetails_controller'

                }
            }
        })




      .state('app.favorites', {
        url: '/favorites',
        views: {
          'mainContent': {
            templateUrl: 'templates/favorites.html',
            controller: 'FavoritesController',
            resolve: {
              dishes: ['menuFactory', function (menuFactory) {
                return menuFactory.query();
              }],
              favorites: ['favoriteFactory', function (favoriteFactory) {
                return favoriteFactory.getFavorites();
              }]
            }
          }
        }
      })


      .state('app.productLists', {
        url: '/playlists',
        views: {
          'mainContent': {
            templateUrl: 'templates/productLists.html',
            controller: 'ProductListsCtrl' // PlaylistsCtrl
          }
        }
      })

      .state('app.home', {
        url: '/home',
        views: {
          'mainContent': {
            templateUrl: 'templates/home.html',
            //controller: 'homeNewsList_controller' // PlaylistsCtrl
          }
        }
      })

      .state('app.stationaryStore', {
        url: '/stationaryStore',
        views: {
          'mainContent': {
            templateUrl: 'templates/stationaryStore.html',
            controller: 'stationaryStore_controller' // PlaylistsCtrl
          }
        }
      })

      .state('app.seasonalStore', {
        url: '/seasonalStore',
        views: {
          'mainContent': {
            templateUrl: 'templates/seasonalStore.html',
            controller: 'seasonalStore_controller' // PlaylistsCtrl
          }
        }
      })

      .state('app.shopPage', {
        url: '/shopPage/:id',
        views: {
          'mainContent': {
            templateUrl: 'templates/shopPage.html',
            controller: 'shopPage_controller', // PlaylistsCtrl
            resolve: {
              dish: ['$stateParams', 'menuFactory', function ($stateParams, menuFactory) {
                return menuFactory.get({
                  id: parseInt($stateParams.id, 10)
                });
              }]
            }

          }
        }
      })


      .state('app.seasonalStoreDetails', {
        url: '/seasonalStoreDetails',
        views: {
          'mainContent': {
            templateUrl: 'templates/seasonalStoreDetails.html',
            controller: 'seasonalStoreDetails_controller' // PlaylistsCtrl
          }
        }
      })

      .state('app.e_coupon', {

        url: '/e_coupon',
        views: {
          'mainContent': {
            templateUrl: 'templates/e_coupon.html',
            controller: 'e_coupon_controller' // PlaylistsCtrl
          }
        }
      })


      //    myProfile
      .state('app.myProfile', {
        url: '/myProfile',
        views: {
          'mainContent': {
            templateUrl: 'templates/myProfile.html',
            controller: 'myProfile_controller' // PlaylistsCtrl
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'mainContent': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl' 
          }
        }
      })



      .state('app.signUp', {
        url: '/signUp',
        views: {
          'mainContent': {
            templateUrl: 'templates/signUp.html',
            //controller: 'SignUpCtrl' // PlaylistsCtrl
          }
        }
      })


      .state('app.forgetPassword', {
        url: '/forgetPassword',
        views: {
          'mainContent': {
            templateUrl: 'templates/forgetPassword.html',
            controller: 'forgetPassword_control' // PlaylistsCtrl

          }
        }
      })

      .state('app.changePassword', {
        url: '/changePassword',
        views: {
          'mainContent': {
            templateUrl: 'templates/changePassword.html',
            controller: 'changePassword_control' // PlaylistsCtrl

          }
        }
      })



    // .state('app.single', {
    //     url: '/playlists/:playlistId',
    //     views: {
    //         'mainContent': {
    //             templateUrl: 'templates/playlist.html',
    //             controller: 'PlaylistCtrl'
    //         }
    //     }
    // })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
