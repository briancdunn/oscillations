app.directive('amp', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/amp.html',
        scope: {
            mainOut: '=',
            amp: '=',
            oscillators: '=',
            amps: '=',
            filters: '='
        },
        controller: 'AmpCtrl'
    }
});

app.controller('AmpCtrl', function($scope, ContextFactory) {

    var outputsMaker = function() {
        return [$scope.mainOut].concat($scope.oscillators).concat($scope.amps).concat($scope.filters).map(function(out) {
            return {
                id: out.id,
                name: out.name
            }
        }).filter(function(out) {
            return out.id !== $scope.amp.id;
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
        var idx;
        if(stub === 'mai') {
            $scope.amp.module.disconnect();
            $scope.amp.module.connect($scope.mainOut.module);
        } else if(stub === 'amp') {
            $scope.amp.module.disconnect();
            idx = findAmpById($scope.output.id);
            $scope.amp.module.connect($scope.amps[idx].module.gain);
        } else if(stub === 'osc') {
            $scope.amp.module.disconnect();
            idx = findOscById($scope.output.id);
            $scope.amp.module.connect($scope.oscillators[idx].module.frequency);
        } else if(stub === 'fil') {
            $scope.amp.module.disconnect();
            idx = findFilterById($scope.output.id);
            $scope.amp.module.connect($scope.filters[idx].module);
        }
    };
});