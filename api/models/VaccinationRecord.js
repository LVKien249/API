const mongoose = require("mongoose")

const VaccinationRecordSchema = new mongoose.Schema(
    {
        identification: {type: String, required: true},
        healthInsuranceNumber: {type: String, required: true},
        representative: {type: String, required: true},
        disease: {type: String, default: ""},
        doseInformation: {type: Object, required: true},
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Vaccination Record", VaccinationRecordSchema);