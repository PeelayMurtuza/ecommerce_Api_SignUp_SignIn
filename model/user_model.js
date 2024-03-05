const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        hidden: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unique: true
    },

    userType: {
        type: String,
        require: true,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    }

}, { timestamp: true, versionKey: false })


module.exports = mongoose.model("firstUSer", userSchema)

