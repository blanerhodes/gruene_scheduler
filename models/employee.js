const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    positions: {
        bottle: {canWork: String, competency: String},
        bartender: {canWork: String, competency: String},
        door: {canWork: String, competency: String},
        opener: {canWork: String, competency: String},
        headBartender: {canWork: String, competency: String},
        manager: {canWork: String, competency: String}
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
    },
    vacation: [String]
});

module.exports = mongoose.model("Employee", employeeSchema);