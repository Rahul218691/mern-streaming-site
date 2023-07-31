const NodeCache = require("node-cache");

const ttl = 60 * 60 * 24;

const cache = new NodeCache({ stdTTL: ttl, useClones: false, checkperiod: ttl * 0.2 })

const setCache = (key, data) => {
    return new Promise((resolve, reject) =>{
        try {
            cache.set(key, data)
            resolve(true) 
        } catch (error) {
            reject(error)
        }
    })
}

const getCache = (key) => {
    return new Promise((resolve, reject) =>{
        try {
            const data =  cache.get(key)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

const deleteCache = (key) => {
    return new Promise((resolve, reject) =>{
        try {
            cache.del(key)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    setCache,
    getCache,
    deleteCache
}