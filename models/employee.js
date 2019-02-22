const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    positions: {
        bottle: String,
        bartender: String,
        door: String,
        opener: String,
        headBartender: String,
        manager: String
    },
    availability: {
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String],
        sunday: [String],
    },
    hours: {
        current: Number,
        max: Number,
        min: Number
    }
});

module.exports = mongoose.model("Employee", employeeSchema);