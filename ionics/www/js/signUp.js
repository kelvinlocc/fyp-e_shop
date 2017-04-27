angular.module('conFusion.controllers').controller('SignUpCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPopup, $ionicLoading) {


    console.log("SignUpCtrl is working..");
    $scope.loginData = $localStorage.getObject('userinfo', '{}');







    function showPopup_warming() {
        var alertPopup = $ionicPopup.alert({
            title: 'warming',
            template: 'your username or password is not correct!'
        });
        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }



    $scope.doSignUp = function () {
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

        if ($scope.loginData.password !=$scope.loginData.confirm_password ) {
          
           
            $ionicPopup.alert({
                title: 'warming',
                template: 'password not match!'
            });

        } 

        $localStorage.storeObject('userinfo', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        // $scope.sample = 'sample test';
        // $timeout(function () {
        //     $scope.closeLogin();
        // }, 1000);
    };

    function checkUserInfo() {
        $ionicPopup.alert({
            title: 'user info',
            template: 'email, username, password ' + $scope.loginData.email + "," + $scope.loginData.username + "," + $scope.loginData.password
        });
    }




});
