const user_model = require("../model/user_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// 1) create the request body
exports.signup = async (req, res) => {


    // 2) insert the data in the user collection 
    const req_body = req.body

    const newUser = {
        name: req_body.name,
        userId: req_body.userId,
        email: req_body.email,
        userType: req_body.userType,
        password: bcrypt.hashSync(req_body.password, 8)
    }


    // 3)  return the req back to the user   
    try {

        const user_created = await user_model.create(newUser)

        res.status(201).send(user_created)

    }

    catch (error) {
        res.status(500).send({
            message: "error occur"
        })
    }

}


//steps
// check user id is present or not
//compare password is correct or not 
//return jwt token in response



exports.signIn = async (req, res) => {
    const user = await user_model.findOne({ userId: req.body.userId })

    if (user == null)
        res.status(400).send({
            message: "userId doesnot match"
        })


    const isPassword = bcrypt.compareSync(req.body.password, user.password)

    if (!isPassword) {
        res.status(400).send({
            message: "pass dosenot  match"
        })
    }

const token = jwt.sign(
    {id:user.id},
    "xyz is my secret ",
    {expiresIn:120}
)

res.status(200).send({
    name:user.name,
    userId:user.userId,
    email : user.email,
    userType :user.userType,
    accessToken : token
})

}