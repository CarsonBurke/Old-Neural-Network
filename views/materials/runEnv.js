import { NeuralNetwork } from "./ai.js"

// Create neural network

let network = new NeuralNetwork()

// Create new layer

network.addLayer({})

let layer1 = network.layers[0]

// Add perceptrons

layer1.addPerceptron()
layer1.addPerceptron()

// New layer

network.addLayer({})

let layer2 = network.layers[1]

// Add perceptrons

layer2.addPerceptron()

// New layer

network.addLayer({})

let layer3 = network.layers[2]

// Add perceptrons

layer3.addPerceptron()

// Run neural network

setInterval(function() {

    network.run({
        inputs: [1, 5]
    })
}, 200)

// Mutate neural network

setInterval(function() {

    network.learn()
}, 1000)