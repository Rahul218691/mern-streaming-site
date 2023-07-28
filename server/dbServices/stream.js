const Stream = require('../models/stream')

const createStream = (data) => {
    return new Promise((resolve, reject) => {
        try {
            Stream.create(data)
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createStream
}