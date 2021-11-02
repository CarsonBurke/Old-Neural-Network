let networks = []

const inputs = [
    { name: 'Bird y', value: 1 },
    { name: 'Pipe y', value: 6 },
    { name: 'Bird Velocity', value: 2 },
]

const outputs = [
    { name: 'Flap' },
    { name: 'Suicide' }
]

let outputCount = 2

createNetwork()

function createNetwork() {
    
    // Create neural network
    
    let network = new NeuralNetwork()
    
    // Create layers
    
    let layerCount = 3
    
    for (let i = 0; i < layerCount; i++) network.addLayer({})
    
    // Create perceptrons
    
    // Create input perceptrons
    
    for (let i = 0; i < inputs.length; i++) network.layers[0].addPerceptron()
    
    // Create hidden perceptrons
    
    let hiddenPerceptronsNeed = 5
    
    // Loop through layers
    
    for (let layerName in network.layers) {
    
        // Filter only hidden layers
    
        let layersCount = Object.keys(network.layers).length
    
        if (layerName > 0 && layerName < layersCount - 1) {
    
            let layer = network.layers[layerName]
    
            for (let i = 0; i < hiddenPerceptronsNeed; i++) layer.addPerceptron()
        }
    }
    
    // Create output perceptrons
    
    for (let i = 0; i < outputs.length; i++) network.layers[layerCount - 1].addPerceptron()
    
    //
    
    network.init(inputs, outputs)

    networks.push(network)
}

// Clone network

/* networks.push(networks[0].clone(inputs)) */

// Run ticks

setInterval(function() {

    for (const network of networks) {

        network.forwardPropagate(inputs)

        network.updateVisuals()
    
        network.learn()
    }
}, 1)