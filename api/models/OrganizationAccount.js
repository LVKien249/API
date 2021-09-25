const mongoose = require("mongoose")

const OrganizationAccountSchema = new mongoose.Schema(
    {
        organizationName: {type: String, required: true},
        address: {type: String, required: true},
        representative: {type: String, required: true},
        phoneNumber: {type: String, require: true},
        city: {type: Number, required: true},
        province: {type: Number, required: true},
        wards: {type: Number, required: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, required: true},
        permission: {type: Number, default: 0},
        isHealthOrganization: {type: Boolean, default: false}
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Organization Account", OrganizationAccountSchema);