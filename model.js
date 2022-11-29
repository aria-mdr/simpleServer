const mongoose = require('mongoose');
const { Schema } = mongoose;

const getCurrentTime = () => {
    return new Date()
}

const animalSchema = Schema({
    name: String, 
    kind: String, 
    age: Number, 
    createdAt: {
        default: getCurrentTime(),
        type: Date
    }
})



const AnimalModel = mongoose.model('animals', animalSchema)

module.exports = AnimalModel;