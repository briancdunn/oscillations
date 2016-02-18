app.filter('connects', function() {
    return function(input, inputs, id) {
        for(var i = 0; i < inputs.length; i++) {
            for(var k = 0; k < inputs[i].length; k++) {
                if(inputs[i][k].id !== id) {
                    input.push(inputs[i][k]);
                }
            }
        }

        return inputs;
    }
})