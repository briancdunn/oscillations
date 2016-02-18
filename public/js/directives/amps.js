app.directive('amps',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/amps.html',
        scope: {
            mainOut: '=',
            oscillators: '=',
            amps: '=',
            filters: '='
        },
        controller: function($scope) {
            console.log('amps',$scope);
        }
    }
});
