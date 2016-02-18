app.directive('main',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/main.html',
        // link: function(scope) {
            
        // },
        controller: function($scope) {
            $scope.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            $scope.masterVol = $scope.audioContext.createGain();
            $scope.masterVol.gain.value = 1;
            $scope.masterVol.connect($scope.audioContext.destination);
            console.log($scope.audioContext);
        }
    }
});

console.log('main-directive.js');