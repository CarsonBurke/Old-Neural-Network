import { NeuralNetwork } from "./ai.js"

let network = new NeuralNetwork()

network.addLayer({
    perceptrons: 1,
})

network.addLayer({

})

console.log(network.layers)

let layer1 = network.layers[0]

layer1.addPerceptron({
    inputs: [1, 5]
})

setInterval(function() {

    network.run()
}, 100)

setInterval(function() {

    network.learn()
}, 1000)