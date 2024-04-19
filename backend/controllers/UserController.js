const UserService = require("../services/UserService");

const createUser = async (request, response) => {
    try {
        const { name, email, password, confirmPassword } = request.body;
        const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isValidEmail = regex.test(email);
        if (!email || !password || !confirmPassword) {
            return response.status(200).json({
                status: 'ERR',
                message: 'Parameters required.'
            })
        } else if (!isValidEmail) {
            return response.status(200).json({
                status: 'ERR',
                message: 'Invalid email.'
            })
        } else if (password !== confirmPassword) {
            return response.status(200).json({
                status: 'ERR',
                message: 'Invalid Confirm Paswword.'
            })
        }
        const response = await UserService.createUser(request.body);
    } catch (error) {
        return response.status(404).json({
            message: "Error Creating User",
            message: error
        })
    }
}

module.exports = {
    createUser
}