const User = require('../models/user')

const checkUserExists = (email) => {
    return new Promise((resolve, reject) => {
        try {
            User.findOne({email})
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const checkUserByVerificationCode = (email, verification) => {
    return new Promise((resolve, reject) => {
        try {
            User.findOne({
                email,
                verificationToken: verification
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const createNewUser = (data) => {
    return new Promise((resolve, reject) => {
        try {
            User.create(data)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const updateUserGrantPermission = (email) => {
    return new Promise((resolve, reject) => {
        try {
            User.updateOne({email},
                { $set: {isVerified:true, verificationToken:""}},
                { upsert: true }
            )
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    checkUserExists,
    createNewUser,
    checkUserByVerificationCode,
    updateUserGrantPermission
}