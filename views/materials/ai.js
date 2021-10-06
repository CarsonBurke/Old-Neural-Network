let defaults = {
    learningRate: 1,
    bias: 1,
}

class Layer {
    constructor() {

        this.perceptrons = {}
    }
    addPerceptron() {

        // Set the requested layer to have the requested inputs

        let layer = this

        // Find number of perceptrons in this layer

        let perceptronCount = Object.keys(layer.perceptrons).length

        // Create and add new perceptron to the layer

        layer.perceptrons[perceptronCount] = new Perceptron()
    }
}

class Perceptron {
    constructor() {


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

        // Create one weight per input

        this.weights = []

        for (let input of this.inputs) {

            // Get a random value relative to the size of learningRate

            let value = Math.random() * this.learningRate

            this.weights.push(value)
        }
    }
    updateWeights() {

        // Reset weight results

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
    run(opts) {

        // Assign opts to usable values

        let importantValues = opts.importantValues

        for (let valueName in importantValues) {

            this[valueName] = importantValues[valueName]
        }

        this.inputs = opts.inputs

        this.inputs.push(this.bias)

        // Run commands to take inputs into an end result

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
    constructor(opts) {

        // Assign default values

        for (let valueName in defaults) {

            this[valueName] = defaults[valueName]
        }

        this.layers = {}


        // Assign opts

        for (let valueName in opts) {

            this[valueName] = opts[valueName]
        }
    }
    addLayer(opts) {

        let layersCount = Object.keys(this.layers).length

        this.layers[layersCount] = new Layer({
            perceptrons: opts.perceptrons
        })
    }
    getPerceptrons() {

        let perceptrons = []

        for (let layerName in this.layers) {

            let layer = this.layers[layerName]

            for (let perceptronName in layer.perceptrons) {

                let perceptron = layer.perceptrons[perceptronName]

                perceptrons.push(perceptron)
            }
        }

        return perceptrons
    }
    train() {


    }
    getImportantValues() {

        let values = {}

        for (let valueName in defaults) {

            values[valueName] = this[valueName]
        }

        return values
    }
    run(opts) {

        function findInputs(layerName, perceptronName) {

            // If in first layer give default inputs

            if (layerName == 0) {

                return opts.inputs
            }

            // Otherwise give inputs from the previous layers' outputs


        }

        // Loop through each layer in the network

        for (let layerName in this.layers) {

            let layer = this.layers[layerName]

            // loop through each perceptron in the layer

            for (let perceptronName in layer.perceptrons) {

                let perceptron = layer.perceptrons[perceptronName]

                // Use the layer and perceptron location to idenify what inputs it should have

                let inputs = findInputs(layerName, perceptronName)

                // Run the perceptron

                perceptron.run({
                    importantValues: this.getImportantValues(),
                    inputs: inputs,
                })
            }
        }

        this.UI()
    }
    learn() {

        // For each perceptron mutate their weights

        let perceptrons = this.getPerceptrons()

        for (let perceptron of perceptrons) perceptron.learn()
    }
    UI() {

        // Loop through each layer in the network

        for (let layerName in this.layers) {

            let layer = this.layers[layerName]

            // loop through each perceptron in the layer

            for (let perceptronName in layer.perceptrons) {

                let perceptron = layer.perceptrons[perceptronName]

                // Values to display

                let displayValues = {
                    inputs: perceptron.inputs,
                    weights: perceptron.weights,
                    transfer: perceptron.transferValue,
                    activate: perceptron.activateValue,
                }

                // If no elements create them

                if (!perceptron.parentEl) {

                    let UIParent = document.getElementById("UIParent")

                    //

                    perceptron.parentEl = document.createElement("div")

                    perceptron.parentEl.classList.add("perceptronParent")

                    UIParent.appendChild(perceptron.parentEl)

                    //

                    perceptron.titleEl = document.createElement("div")

                    perceptron.titleEl.classList.add("perceptronTitle")

                    perceptron.titleEl.innerText = "Name: " + perceptronName

                    perceptron.parentEl.appendChild(perceptron.titleEl)

                    for (let valueName in displayValues) {

                        let value = displayValues[valueName]

                        perceptron.headerEls = {}
                        perceptron.contentEls = {}

                        perceptron.headerEls[valueName] = document.createElement("h3")

                        perceptron.headerEls[valueName].classList.add("perceptronHeader")

                        perceptron.headerEls[valueName].innerText = valueName + ":"

                        perceptron.parentEl.appendChild(perceptron.headerEls[valueName])

                        //

                        perceptron.contentEls[valueName] = document.createElement("strong")

                        perceptron.contentEls[valueName].classList.add("perceptronContent")

                        perceptron.parentEl.appendChild(perceptron.contentEls[valueName])
                    }
                }

                for (let valueName in displayValues) {

                    let value = displayValues[valueName]

                    perceptron.contentEls.activate.innerText = value

                    perceptron.contentEls[valueName].innerText = value
                }
            }
        }
    }
}

// Convert the weights into a single arbitrary value

// Make sure the value is greater than 0

export { NeuralNetwork }