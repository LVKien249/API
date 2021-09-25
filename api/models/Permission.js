const mongoose = require("mongoose")

const PermissionSchema = new mongoose.Schema(
    {
        permission: {type: Number, required: true},
        describe: {type: String, required: true},
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Permission", PermissionSchema);