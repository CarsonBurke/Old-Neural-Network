const inputs = [
    { name: 'X position', value: 1 },
    { name: 'Y position', value: 6 },
    { name: 'Velocity', value: 2 },
]

const outputs = [
    { name: 'Move up' },
    { name: 'Move down' }
]

let outputCount = 2

createNetwork()

function createNetwork() {
    
    // Create neural network
    
    const network = new NeuralNetwork()
    
    // Create layers
    
    let layerCount = 3
    
    for (let i = 0; i < layerCount; i++) network.addLayer()
    
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
}

// Clone network

const firstNetwork = networks[Object.keys(networks)[0]]

for (let i = 0; i < 0; i++) {

    // Clone firstNetwork and assign duplicateNetwork to networks

    const clonedNetwork = firstNetwork.clone(inputs, outputs)
}

// Run ticks

setInterval(function() {

    for (const ID in networks) {

        const network = networks[ID]

        network.forwardPropagate(inputs)

        network.updateVisuals()
    
        network.learn()
    }
}, 1)