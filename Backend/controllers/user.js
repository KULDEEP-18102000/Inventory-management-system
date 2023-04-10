const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("came to signup")
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email: email } )
        if (user) {
            console.log("User already exists")
            res.json({ message: "user already exists" })
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                console.log(err)
                await User.create({ name: name, email: email, password: hash })
                res.status(201).json({success:true, message: "successfully created new user" })
            })
        }
    } catch (error) {
        res.status(500).json(err)
    }
}

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name }, "bobyiskuldeep")
}

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne( { email: email } )
        console.log(user)
        if (!user) {
            res.status(404).json({ message: "user not found" })
        }
        else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json({ success: false, message: "Something went wrong" })
                }
                if (result === true) {
                    res.status(200).json({ success: true, message: "user login successfull", authtoken: generateAccessToken(user.id, user.name) })
                    // res.redirect('/expense')
                    // res.sendFile(path.join(__dirname,'../../Frontend/expense.html'))
                } else {
                    res.status(400).json({ success: false, message: "incorrect password" })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }

}