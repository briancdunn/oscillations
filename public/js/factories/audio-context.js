app.factory('ContextFactory', function() {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();

    return {
        createNode: function(node) {
            switch(node) {
                case 'filt':
                    return audioContext.createBiquadFilter();
                    break;
                case 'amp':
                    return audioContext.createGain();
                    break;
                case 'lfo':
                    return audioContext.createOscillator();
                    break;
                case 'main':
                    return audioContext.createGain();
                    break;
                case 'osci':
                    return audioContext.createOscillator();
                    break;
            }
        },
        getContext: function() {
            return audioContext;
        },
        getDestination: function() {
            return audioContext.destination;
        }
    }
})