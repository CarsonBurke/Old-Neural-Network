import { NeuralNetwork } from "./ai.js"

// Create neural network

let network = new NeuralNetwork()

// Create new layer

network.addLayer({})

let layer1 = network.layers[0]

// Add perceptrons

layer1.addPerceptrons(2)

// New layer

network.addLayer({})

let layer2 = network.layers[1]

// Add perceptrons

layer2.addPerceptrons(3)

// New layer

network.addLayer({})

let layer3 = network.layers[2]

// Add perceptrons

layer3.addPerceptrons(3)

// New layer

network.addLayer({})

let layer4 = network.layers[3]

// Add perceptrons

layer4.addPerceptrons(3)

// New layer

network.addLayer({})

let layer5 = network.layers[4]

// Add perceptrons

layer5.addPerceptrons(1)

// Initialize neural network

network.drawVisuals()

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