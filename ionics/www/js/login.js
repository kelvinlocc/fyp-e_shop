angular.module('conFusion.controllers').controller('loginCtrl', function ($scope, $ionicModal,
    $timeout, $localStorage, $ionicPopup, $ionicLoading, $state, $ionicHistory) {


    console.log("loginCtrl is working..");
    $scope.loginData = $localStorage.getObject('userinfo', '{}');

    $scope.isLoginTest = function () {
        console.log("isLoginTest");

    };





    function showPopup_warming() {
        var alertPopup = $ionicPopup.alert({
            title: 'warming',
            template: 'your username or password is not correct!'
        });
        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }

    $scope.text = 'me@example.com';


    $scope.doLogin = function () {
        console.log('Doing loginData.email' + $scope.loginData.email);
        console.log('Doing loginData' + $scope.loginData);
        // console.log('Doing login', loginData);
        //checkUserInfo();
        if ($scope.loginData.username == '' || $scope.loginData.password == '' || $scope.loginData.email == '') {
            $ionicPopup.alert({
                title: 'warming',
                template: 'Please fill in all the blank!'
            });
            return;
        }

        if ($scope.loginData.username == 'admin' && $scope.loginData.password == 'admin') {
            console.log("login successful");
          
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $localStorage.storeObject('userinfo', $scope.loginData);

            $state.go('app.home'); 
          
            checkLoginUserInfo();

        } else {
            showPopup_warming();
        }

      
       
    };

    function checkUserInfo() {
        $ionicPopup.alert({
            title: 'user info',
            template: 'email, username, password ' + $scope.loginData.email + "," + $scope.loginData.username + "," + $scope.loginData.password
        });
    }

    function checkLoginUserInfo() {
        var tempDate = $localStorage.getObject('userinfo', '{}');
        console.log("tempDate " + tempDate.email + "," + tempDate.username + "," + tempDate.password);
    };




});
