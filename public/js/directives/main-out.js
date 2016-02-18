app.directive('mainOut',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/main-out.html',
        scope: {
            mainOut: '='
        },
        controller: 'MainOutCtrl'
    }
});

app.controller('MainOutCtrl', function($scope) {
    $scope.mute = false;
    var preMuteVol;
    
    $scope.muteToggle = function() {
        if($scope.mute) {
            preMuteVol = $scope.mainOut.gain.value;
            $scope.mainOut.gain.value = 0;
        } else {
            $scope.mainOut.gain.value = preMuteVol;
        }
    }
});