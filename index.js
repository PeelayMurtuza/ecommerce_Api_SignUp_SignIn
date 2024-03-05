const server_config = require("./config/server.config")
const express = require("express")
const db_config = require("./config/db.config")
const { default: mongoose } = require("mongoose")
const app = express()
const user_model = require("./model/user_model")
const bcrypt = require("bcryptjs")
const authController = require("./controllers/auth.controller")

app.use(express.json())

mongoose.connect(db_config.db_url)

const db = mongoose.connection

db.on("error", () => {
    console.log("not able to connect", err)
})

db.once("open", () => {
    console.log("Database Connected successfully")
    init()
})

async function init() {

    try {

        const user = await user_model.findOne({ user: "admin" })
        if (user) {
            console.log("admin is already exist ")
            return
        }

    } catch (error) {

        console.log("error occur", error)

    }

    try {

        const user = await user_model.create({
            name: "MURTUZA",
            userId: "admin",
            email: "murtuza@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Murtuza1", 8)
        })
        console.log(user)

    }

    catch (err) {
        console.log("error occur admin already exist")
    }
}
require("./routes/auth.routhes")(app)
app.listen(server_config.PORT, () => {
    console.log("started on port not ", server_config.PORT)
})

