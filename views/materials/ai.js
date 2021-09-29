/* 
Environment Lore:


*/


// Randomly adjust a value by a set amount

function mutate(value, amount) {

    // Decide if to subract or add

    let boolean = Math.floor(Math.random() * 2) + 1

    // Random amount to mutate

    let mutation = Math.random() * amount

    // Apply mutation

    if (boolean == 1) value += Math.random() * mutation
    if (boolean == 2) value -= Math.random() * mutation

    return value
}

class NeuralNetwork {
    constructor(opts) {

        for (let optName in opts) this[optName] = opts[optName]


    }
}

// Define options for our network

let opts = {
    inputs: [2, 1],
    weights: [],
}

// Creat the network

let network = new NeuralNetwork(opts)

// Weight the inputs by arbitrary values to inform the AI

NeuralNetwork.prototype.createWeights = function() {

    for (let input of this.inputs) {

        let value = Math.floor(Math.random() * 100)

        this.weights.push(input * value)
    }
}

NeuralNetwork.prototype.applyWeights = function() {

    // If no weights exist

    if (this.weights.length == 0) this.createWeights()

    // Otherwise mutate weights

    let newWeights = []

    for (let weight of this.weights) newWeights.push(mutate(weight, 5))

    this.weights = newWeights
}

// Convert the weights into a single arbitrary value

NeuralNetwork.prototype.transfer = function() {

    this.transferValue = 0

    for (let weight of this.weights) this.transferValue += weight
}

// Make sure the value is greater than 0

NeuralNetwork.prototype.activate = function() {

    this.activateValue = Math.max(this.transferValue, 0)
}


/* network.applyWeights()

console.log(network.activate) */

function train() {

    network.applyWeights()

    network.transfer()
    
    network.activate()

    console.log(Math.floor(network.activateValue))
}

setInterval(train, 100)