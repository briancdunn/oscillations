app.directive('components',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/components.html',
        controller: 'ComponentsCtrl'
    }
});

app.controller('ComponentsCtrl', function($scope, ContextFactory, ModuleFactory) {
    $scope.mainOut = ModuleFactory.createMainOut();
    $scope.oscillators = [];
    $scope.lfos = [];
    $scope.amps = [];
    $scope.filters = [];
    $scope.keyboard;

    // var osc1 = ContextFactory.getContext().createOscillator();
    // var osc2 = ContextFactory.getContext().createOscillator();
    // var merge = ContextFactory.getContext().createChannelMerger(2);
    // osc2.frequency.value = 440;
    // osc1.frequency.value = 100;
    // osc1.connect(merge);
    // osc2.connect(merge);
    // merge.connect(ContextFactory.getDestination());
    // osc2.start(0);
    // osc1.start(0);

    $scope.addOscillator = function() {
        var osc = ModuleFactory.createOsc($scope.oscillators.length+1);
        osc.module.connect($scope.mainOut.module);
        $scope.oscillators.push(osc);
        $scope.$broadcast('newModule');
    }

    $scope.addLFO = function() {
        var lfo = ModuleFactory.createLFO($scope.lfos.length+1);
        $scope.lfos.push(lfo);
        $scope.$broadcast('newModule');
    }

    $scope.addAmp = function() {
        var amp = ModuleFactory.createAmp($scope.amps.length+1);
        amp.module.connect($scope.mainOut.module);
        $scope.amps.push(amp);
        $scope.$broadcast('newModule');
    }

    $scope.addFilter = function() {
        var filter = ModuleFactory.createFilter($scope.filters.length+1);
        $scope.filters.push(filter);
        $scope.$broadcast('newModule');
    }

    $scope.addOscillator();
});