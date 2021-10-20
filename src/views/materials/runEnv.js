import { NeuralNetwork } from "./neuralNetwork.js"

let networks = []

let inputs = [1, 5, 6]

createNetwork()

function createNetwork() {

    // Create neural network

    let network = new NeuralNetwork()

    //

    let outputCount = 2

    // Create layers

    let layerCount = 3

    for (let i = 0; i < layerCount; i++) network.addLayer({})

    // Create perceptrons

    // Create input perceptrons

    network.layers[0].addPerceptrons(inputs.length)

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

    network.layers[layerCount - 1].addPerceptrons(outputCount)

    //

    networks.push(network)
}

//

networks.push(networks[0].clone())

//

console.log(networks)

for (let network of networks) runNetwork(network)

function runNetwork(network) {

    // Run neural network

    setInterval(function() {

        network.run({
            inputs: inputs
        })

        network.updateVisuals()

    }, 1)

    // Mutate neural network 

    setInterval(function() {

        network.learn()

    }, 10)
}