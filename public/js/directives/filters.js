app.directive('filters',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/filters.html',
        scope: {
            mainOut: '=',
            oscillators: '=',
            amps: '=',
            filters: '='
        },
        controller: function($scope) {
            console.log('filters',$scope);
        }
    }
});
