import { NeuralNetwork } from "./ai.js"

// Create neural network

let network = new NeuralNetwork()

//

let inputs = [
    [1, 5]
]

// Create layers

let layerCount = 4

for (let i = 0; i < layerCount; i++) network.addLayer({})

// Create perceptrons

// Create input perceptrons

for (let i = 0; i < inputs.length; i++) network.layers[0].addPerceptrons(inputs.length)

// Create hidden perceptrons

let hiddenPerceptronsNeed = 4

// Loop through layers

for (let layerName in network.layers) {

    // Filter only hidden layers

    let layersCount = Object.keys(network.layers).length

    if (layerName > 0 && layerName < layersCount - 1) {

        let layer = network.layers[layerName]

        layer.addPerceptrons(hiddenPerceptronsNeed)
    }
}

// Create output perceptrons

network.layers[layerCount - 1].addPerceptrons(1)

// Initialize neural network

network.config()

// Run neural network

setInterval(function() {

    network.run({
        inputs: inputs
    })
}, 200)

// Mutate neural network

setInterval(function() {

    network.learn()
}, 1000)