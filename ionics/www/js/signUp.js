angular.module('conFusion.controllers').controller('SignUpCtrl', function ($scope,
    $ionicModal, $timeout, $localStorage, $ionicPopup, $ionicLoading,baseURL) {


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
        showIonicLoading();

        $localStorage.storeObject('userinfo', $scope.loginData);
        
    };

    $scope.loadAllMeasure = function () {
        signUp().then(function (data) {

            $scope.newsList = data.data;
            console.log("news: ", data);

            //console.log("news: ", data[0].description);
        });
    

    };
    $scope.loadAllMeasure();

    showIonicLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    };


    function signUp() {
        var deferred = $q.defer();

        var url = baseURL + "news?";
        console.log("news@ " + url);
        $http.get(url).
            then(function (response) {
                deferred.resolve(response);
            });
        return deferred.promise;
    }



    function checkUserInfo() {
        $ionicPopup.alert({
            title: 'user info',
            template: 'email, username, password ' + $scope.loginData.email + "," + $scope.loginData.username + "," + $scope.loginData.password
        });
    }




});
