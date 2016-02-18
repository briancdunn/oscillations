app.directive('filter', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/filter.html',
        scope: {
            mainOut: '=',
            filter: '=',
            oscillators: '=',
            amps: '=',
            filters: '='
        },
        controller: 'FilterCtrl'
    }
});

app.controller('FilterCtrl', function($scope, ContextFactory) {
    console.log($scope.filter);
    $scope.filter.module.type='lowpass';
    var outputsMaker = function() {
        return [$scope.mainOut].concat($scope.oscillators).concat($scope.amps).concat($scope.filters).map(function(out) {
            return {
                id: out.id,
                name: out.name
            }
        }).filter(function(out) {
            return out.id !== $scope.filter.id;
        });
    };

    var findAmpById = function(id) {
        for(var i = 0; i < $scope.amps.length; i++) {
            if($scope.amps[i].id === id) {
                return i;
            }
        }
    };

    var findOscById = function(id) {
        for(var i = 0; i < $scope.oscillators.length; i++) {
            if($scope.oscillators[i].id === id) {
                return i;
            }
        }
    };

    var findFilterById = function(id) {
        for(var i = 0; i < $scope.filters.length; i++) {
            if($scope.filters[i].id === id) {
                return i;
            }
        }
    };

    $scope.outputs = outputsMaker();
    $scope.$on('newModule', function() {
        $scope.outputs = outputsMaker();
    });

    $scope.changeOutput = function() {
        var stub = $scope.output.id.slice(0,3);
        console.log($scope.output);
        if(stub === 'mai') {
            $scope.filter.module.disconnect();
            $scope.filter.module.connect($scope.mainOut.module);
        } else if(stub === 'amp') {
            $scope.filter.module.disconnect();
            var idx = findAmpById($scope.output.id);
            $scope.filter.module.connect($scope.amps[idx].module.gain);
        } else if(stub === 'osc') {
            $scope.filter.module.disconnect();
            var idx = findOscById($scope.output.id);
            $scope.filter.module.connect($scope.oscillators[idx].module.frequency);
        } else if(stub === 'fil') {
            $scope.filter.module.disconnect();
            idx = findFilterById($scope.output.id);
            $scope.filter.module.connect($scope.filters[idx].module);
        }
    };
});