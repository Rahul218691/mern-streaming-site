const User = require('../models/user')

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            User.findById({_id: id})
            .select('-password')
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    findUserById
}