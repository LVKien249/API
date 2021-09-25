const mongoose = require("mongoose")

const VaccineSchema = new mongoose.Schema(
    {
        nameVaccine: {type: String, required: true},
        manufacturer: {type: String, default: ""},
        nationality: {type: String, default: ""},
        objectDose: {type: String, default: ""},
        numberDose: {type: Number, required: true},
        timeDose: {type: String, required: true},
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Vaccine", VaccineSchema);