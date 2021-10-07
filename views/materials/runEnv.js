import { NeuralNetwork } from "./ai.js"

let network = new NeuralNetwork()

network.addLayer({})

let layer1 = network.layers[0]

layer1.addPerceptron()
layer1.addPerceptron()

setInterval(function() {

    network.run({
        inputs: [1, 5]
    })
}, 200)

setInterval(function() {

    network.learn()
}, 1000)