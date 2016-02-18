app.filter('removeId', function() {
    return function(output, input, id) {
        console.log('remove',output,input,id)
        for(var i = 0; i < input.length; i++) {
            if(input[i].id !== id) {
                output.push(input[i]);
            }
        }

        return output;
    };
})