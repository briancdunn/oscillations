app.factory('ModuleFactory', function(ContextFactory) {
    var moduleMaker = function(id, node) {
        var stub = node.toLowerCase().slice(0,4);

        return {
            module: ContextFactory.createNode(stub),
            id: stub + id,
            name: node + ' ' + id
        };
    };

    

    var oscs = [];
    var amps = [];
    var filters = [];
    var main = [];

    return {
        connect: function(from, to) {
            //
        },
        createAmp: function(id) {
            var amp = moduleMaker(id, 'Amp');
            amps.push(amp);
            return amp;
        },
        createFilter: function(id) {
            var filter = moduleMaker(id, 'Filter');
            filters.push(filter);
            return filter;
        },
        createLFO: function(id) {
            var lfo = moduleMaker(id,'LFO');
            lfo.module.frequency.value = 6;
            lfo.depth = ContextFactory.createNode('amp');
            lfo.module.connect(lfo.depth);

            return lfo;
        },
        createOsc: function(id) {
            var osc = moduleMaker(id, 'Oscillator');
            // osc.connect(main.module);
            oscs.push(osc);
            return osc;
        },
        createMainOut: function() {
            main = moduleMaker('', 'Main');
            main.module.connect(ContextFactory.getDestination());

            return main;
        },
        getAmps: function() {
            return amps.map(function(amp) {
                return {
                    id: amp.id,
                    name: amp.name
                };
            });
        },
        getFilters: function() {
            return filters.map(function(filter) {
                return {
                    id: filter.id,
                    name: filter.name
                };
            });
        },
        getOscs: function() {
            return oscs.map(function(osc) {
                return {
                    id: osc.id,
                    name: osc.name
                };
            });
        },
        setOsc: function(id, type, val) {
            if(type === 'freq') {
                oscs[findOscById(id)].frequency.value = val;
            } else if(type === 'type') {
                oscs[findOscById(id)].type = val;
            }
        }
    }
})