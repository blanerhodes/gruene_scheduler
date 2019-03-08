const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
    monday: {
            degOfBusy: String,
            "8": [String],
            "9": [String],
            "10": [String],
            "13": [String],
            "15": [String],
            "17": [String],
            "18": [String],
            "19": [String],
            "20": [String],
            "21": [String]
            },
    tuesday: {
        degOfBusy: String,
        "8": [String],
        "9": [String],
        "10": [String],
        "13": [String],
        "15": [String],
        "17": [String],
        "18": [String],
        "19": [String],
        "20": [String],
        "21": [String]
        },
    wednesday: {
        degOfBusy: String,
        "8": [String],
        "9": [String],
        "10": [String],
        "13": [String],
        "15": [String],
        "17": [String],
        "18": [String],
        "19": [String],
        "20": [String],
        "21": [String]
        },
    thursday: {
        degOfBusy: String,
        "8": [String],
        "9": [String],
        "10": [String],
        "13": [String],
        "15": [String],
        "17": [String],
        "18": [String],
        "19": [String],
        "20": [String],
        "21": [String]
        },
    friday: {
        degOfBusy: String,
        "8": [String],
        "9": [String],
        "10": [String],
        "13": [String],
        "15": [String],
        "17": [String],
        "18": [String],
        "19": [String],
        "20": [String],
        "21": [String]
        },
    saturday: {
        degOfBusy: String,
        "8": [String],
        "9": [String],
        "10": [String],
        "13": [String],
        "15": [String],
        "17": [String],
        "18": [String],
        "19": [String],
        "20": [String],
        "21": [String]
        },
    sunday: {
        degOfBusy: String,
        "8": [String],
        "9": [String],
        "10": [String],
        "13": [String],
        "15": [String],
        "17": [String],
        "18": [String],
        "19": [String],
        "20": [String],
        "21": [String]
        }
});

module.exports = mongoose.model("Week", weekSchema);