const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema(
    {
        fullName: {type: String, required: true},
        dateOfBirth: {type: Date, required: true},
        phoneNumber: {type: String, required: true, unique: true},
        gender: {type: String, required: true},
        identification: {type: String, required: true, unique: true},
        address: {type: String, required: true},
        city: {type: Number, required: true},
        province: {type: Number, required: true},
        wards: {type: Number, required: true}
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Account", AccountSchema);