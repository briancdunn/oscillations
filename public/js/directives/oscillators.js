app.directive('oscillators',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/oscillators.html',
        scope: {
            mainOut: '=',
            oscillators: '=',
            amps: '=',
            filters: '='
        },
        controller: function($scope) {
            // $scope.oscillators = ModuleFactory.getOscs();
        }
    }
});

console.log('oscillators-directive.js');