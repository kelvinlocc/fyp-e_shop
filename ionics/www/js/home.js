angular.module('conFusion.controllers').controller('homeCtrl', function ($scope, $ionicModal,
    $timeout, $localStorage, $ionicPopup, $ionicLoading, $http) {


    console.log("homeCtrl is working..");
    $scope.newsList = [{
        title: '15% Off For every purchase Over $200',
        id: 1
    },
    {
        title: 'premium items are 70% off or more!',
        id: 2
    },
   
    ];
    getcomments();
    function getcomments() {
        console.log("getComments");
        $http.get('http://localhost:3000/posters').
            then(function (response) {
                console.log("response " + response);
                $scope.temp = response.data;
                console.log('$scope.test: ' + $scope.temp);
                console.log('$scope.test: ' + response[0]);
                console.log('$scope.test: ' + response.filepath);
                console.log('$scope.test: ' + $scope.temp[0].filepath);

                // console.log('$scope.test: '+$scope.test.description);//useful
            });
    };


});
