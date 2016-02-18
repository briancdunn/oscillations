app.factory('NoteFactory',function() {
    return {
        findFrequency: function(note,octave) {
            // var freq = 440*Math.pow(Math.pow(2,1/12),((+note+3)+(+octave-5)*12));
            var freq = 440*Math.pow(Math.pow(2,1/12),((+note)+(+octave)*12));
            console.log('find',note,octave,freq);
            return Math.floor(freq);
        },
        findNote: function(freq) {
            return;
        }
    }
})