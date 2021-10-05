let defaults = {
    learningRate: 1,
    bias: 1,
}

class NeuralNetwork {
    constructor(opts) {

        // Assign default values

        for (let valueName in defaults) {

            this[valueName] = defaults[valueName]
        }

        // Assign opts

        for (let valueName in opts) {

            this[valueName] = opts[valueName]
        }
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

// Convert the weights into a single arbitrary value

// Make sure the value is greater than 0

export { NeuralNetwork }