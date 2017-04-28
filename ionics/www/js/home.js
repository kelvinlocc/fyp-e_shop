angular.module('conFusion.controllers').controller('homeCtrl', function ($scope, $ionicModal,
    $timeout, $localStorage, $ionicPopup, $ionicLoading, $http, $q, baseURL) {


    console.log("homeCtrl is working..");
 
    $scope.baseURL = baseURL;

    $scope.loadAllMeasure = function () {
        loadData().then(function (data) {
           
            $scope.newsList = data.data;
            console.log("news: ", data);
            //console.log("news: ", data[0].description);
        });
        loadPoster().then(function (data){
            var posters_temp = data.data;
            
            for (var i = 0; i < posters_temp.length; i++){
                var poster_id = posters_temp[i].poster_id;
                var url = baseURL + "posters/openImage?poster_id=" + poster_id;
                console.log("url@" + url);
                posters_temp[i].imagPath = url;
            }
            $scope.posters = posters_temp;
            console.log("posters", posters_temp[0]);
            console.log("posters", posters_temp[0].image_path);
            console.log("posters", posters_temp[0].imagPath);

        });

    };
    $scope.loadAllMeasure();


    function loadData() {
        var deferred = $q.defer();

        var url = baseURL + "news?";
        console.log("news@ " + url);
        $http.get(url).
            then(function (response) {                           
                deferred.resolve(response);
            });
        return deferred.promise;
    }

    function loadPoster() {
        var deferred = $q.defer();

        var url = baseURL+"posters?";
        $http.get(url).
            then(function (response) {



                deferred.resolve(response);



            });
        return deferred.promise;
    }





});
