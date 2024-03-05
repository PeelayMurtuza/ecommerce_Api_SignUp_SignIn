const authController = require("../controllers/auth.controller")
const authToken = require("../controllers/auth.controller")

module.exports = (app) => {
   app.post("/ecommerce/api/v1/auth/signup", authController.signup)
   app.post("/ecommerce/api/v1/auth/signin", authToken.signIn)
}