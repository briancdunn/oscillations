app.directive('oscillator', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/oscillator.html',
        scope: {
            mainOut: '=',
            oscillator: '=',
            oscillators: '=',
            amps: '=',
            filters: '='
        },
        controller: 'OscCtrl'
    }
});

app.controller('OscCtrl', function($scope, ContextFactory, NoteFactory) {
    $scope.freqInput = true;
    $scope.isOn = false;
    $scope.new = true;
    $scope.oscillator.module.type = 'sine';
    $scope.output= {
        id: 'main'
    };
    $scope.note = 0;
    $scope.octave = 0;

    var outputsMaker = function() {
        return [$scope.mainOut].concat($scope.oscillators).concat($scope.amps).concat($scope.filters).map(function(out) {
            return {
                id: out.id,
                name: out.name
            }
        }).filter(function(out) {
            return out.id !== $scope.oscillator.id;
        });
    }

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

    $scope.powerToggle = function() {
        var frequency;
        var type;
        if(!$scope.isOn) {
            $scope.oscillator.module.stop(0);
        } else if($scope.new === true) {
            $scope.oscillator.module.start(0);
            $scope.new = false;
        } else {
            frequency = $scope.oscillator.module.frequency.value;
            type = $scope.oscillator.module.type;
            $scope.oscillator.module = ContextFactory.getContext().createOscillator();
            $scope.oscillator.module.frequency.value = frequency;
            $scope.oscillator.module.type = type;
            $scope.oscillator.module.connect($scope.mainOut.module);
            $scope.changeOutput();
            $scope.oscillator.module.start(0);
        }
    };

    $scope.shapeChange = function() {
        console.log($scope.oscillator.module.type);
    }

    $scope.changeOutput = function() {
        var stub = $scope.output.id.slice(0,3);
        if(stub === 'mai') {
            $scope.oscillator.module.disconnect();
            $scope.oscillator.module.connect($scope.mainOut.module);
        } else if(stub === 'amp') {
            $scope.oscillator.module.disconnect();
            var idx = findAmpById($scope.output.id);
            console.log($scope.amps[idx].module);
            $scope.oscillator.module.connect($scope.amps[idx].module);
        } else if(stub === 'fil') {
            $scope.oscillator.module.disconnect();
            idx = findFilterById($scope.output.id);
            $scope.oscillator.module.connect($scope.filters[idx].module);
        } else if(stub === 'osc') {
            $scope.oscillator.module.disconnect();
            idx = findOscById($scope.output.id);
            $scope.oscillator.module.connect($scope.oscillators[idx].module.frequency);
        }
    }
    $scope.changeOutput();

    $scope.changeFrequency = function() {
        var freq = NoteFactory.findFrequency($scope.note,$scope.octave);
        // console.log($scope.note,$scope.octave,freq);
        $scope.oscillator.module.frequency.value = freq;
    }
});