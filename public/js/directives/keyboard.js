app.directive('keyboard', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/keyboard.html',
        scope: {
            oscillators: '=',
            amps: '='
        },
        controller: 'KeyCtrl'
    }
});

app.controller('KeyCtrl', function($scope, ContextFactory, NoteFactory) {
    $scope.gain = ContextFactory.getContext().createGain();
    $scope.gain.gain.value = 0;
    $scope.osc = ContextFactory.getContext().createOscillator();
    $scope.new = true;
    $scope.octave=0;
    var keyVals = {
        'A': {
            'note': -9,
            'octave': 0
        },
        'W': {
            'note': -8,
            'octave': 0
        },
        'S': {
            'note': -7,
            'octave': 0
        },
        'E': {
            'note': -6,
            'octave': 0
        },
        'D': {
            'note': -5,
            'octave': 0
        },
        'F': {
            'note': -4,
            'octave': 0
        },
        'T': {
            'note': -3,
            'octave': 0
        },
        'G': {
            'note': -2,
            'octave': 0
        },
        'Y': {
            'note': -1,
            'octave': 0
        },
        'H': {
            'note': 0,
            'octave': 0
        },
        'U': {
            'note': 1,
            'octave': 0
        },
        'J': {
            'note': 2,
            'octave': 0
        },
        'K': {
            'note': -9,
            'octave': 1
        },
        'O': {
            'note': -8,
            'octave': 1
        },
        'L': {
            'note': -7,
            'octave': 1
        },
        'P': {
            'note': -6,
            'octave': 1
        },
        ';': {
            'note': -5,
            'octave': 1
        }
    }
    var tempFreq;
    var keydownYes = false;

    $(window).keydown(function(e) {
        if (toFreq !== undefined && keydownYes === false) {
            console.log(e.keyCode);
            tempFreq = $scope.oscillators[toFreq].module.frequency.value;
            var note = keyVals[e.keyCode === 186 ? ';' : String.fromCharCode(e.keyCode)];
            if(note !== undefined) {
                keydownYes = true;
                console.log(note);
                $scope.oscillators[toFreq].module.frequency.value = NoteFactory.findFrequency(note.note,parseInt(note.octave)+parseInt($scope.octave));
                $scope.amps[toGain].module.gain.value = 1;
            }
        }
    })
    .keyup(function(e) {
        if(keydownYes === true) {
            $scope.amps[toGain].module.gain.value = 0;
            $scope.oscillators[toFreq].module.frequency.value = tempFreq;
            keydownYes = false;
        }
    });

    var outputsMaker = function() {
        return $scope.oscillators.concat($scope.amps).map(function(out) {
            return {
                id: out.id,
                name: out.name
            }
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

    var toFreq;
    $scope.changeFreqOutput = function() {
        console.log($scope.freqOutput);
        toFreq = findOscById($scope.freqOutput.id);
    }

    var toGain;
    $scope.changeGainOutput = function() {
        console.log($scope.gainOutput);
        toGain = findAmpById($scope.gainOutput.id);
        console.log(toGain);
        $scope.amps[toGain].module.gain.value = 0;
    }
});