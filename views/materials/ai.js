let defaults = {
    learningRate: 1,
    bias: 1,
    layers: {},
}

class Layer {
    constructor(opts) {


    }
    addPerceptron(opts) {

        // Set the requested layer to have the requested inputs

        let layer = this.layer

        let perceptronCount = Object.keys(layer.perceptrons).length

        let perceptron = layer.perceptrons[perceptronCount]

        perceptron = new Perceptron({
            inputs: opts.inputs,
        })
    }
}

class Perceptron {
    constructor(opts) {

        this.inputs = opts.inputs
    }
    mutateWeights() {

        // Randomly adjust a value by a set amount

        function mutate(value, amount) {

            // Decide if to subract or add

            let boolean = Math.floor(Math.random() * 2)

            // Random amount to mutate

            let mutation = Math.random() * amount

            // Apply mutation

            if (boolean == 0) value += Math.random() * mutation
            if (boolean == 1) value -= Math.random() * mutation

            return value
        }

        // Mutate weights

        let newWeights = []

        for (let weight of this.weights) newWeights.push(mutate(weight, this.learningRate))

        this.weights = newWeights
    }
    createWeights() {

        let value = Math.random() * this.learningRate

        this.weights = []

        for (let input of this.inputs) this.weights.push(value)
    }
    updateWeights() {

        this.weightResults = []

        let i = 0

        for (let input of this.inputs) {

            let weight = this.weights[i]

            this.weightResults.push(input * weight)

            i++
        }
    }
    applyWeights() {

        // If no weights exist create them

        if (!this.weights) this.createWeights()


        // Update weightResults to match inputs

        this.updateWeights()
    }
    transfer() {

        this.transferValue = 0

        for (let weightResult of this.weightResults) this.transferValue += weightResult
    }
    activate() {

        this.activateValue = Math.max(this.transferValue, 0)
    }
    run() {

        // Assign opts

        for (let valueName in opts) {

            this[valueName] = opts[valueName]
        }

        this.inputs.push(this.bias)

        this.applyWeights()

        this.transfer()

        this.activate()

        console.log((this.activateValue).toFixed(2))
    }
    learn() {

        console.log("Learned")

        this.mutateWeights()
    }
}

class NeuralNetwork {
    constructor() {

        // Assign default values

        for (let valueName in defaults) {

            this[valueName] = defaults[valueName]
        }
    }
    addLayer(opts) {

        let layersCount = Object.keys(this.layers).length

        let layer = this.layers[layersCount]

        layer = new Layer({
            perceptrons: opts.perceptrons
        })
    }
    getPerceptrons() {

        let perceptrons = []

        for (let layerName in this.layers) {

            let layer = this.layers[layerName]

            for (let perceptronName in layer) {

                let perceptron = layer[perceptronName]

                perceptrons.push(perceptron)
            }
        }

        return perceptrons
    }
    train() {


    }
    run() {

        let perceptrons = this.getPerceptrons()

        for (let perceptron of perceptrons) perceptron.run()
    }
    learn() {

        let perceptrons = this.getPerceptrons()

        for (let perceptron of perceptrons) perceptron.learn()
    }
}

// Convert the weights into a single arbitrary value

// Make sure the value is greater than 0

export { NeuralNetwork }