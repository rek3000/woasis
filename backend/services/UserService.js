const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Email already exist.'
                })
            }
            const hash = bcrypt.hashSync(password, 20)
            const createdUser = await User.create({
                name,
                email,
                password: hash
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })

            }
        } catch (error) {
            // reject(error)
            console.log("Error creating user")
        }
    })
}

module.exports = {
    createUser
}