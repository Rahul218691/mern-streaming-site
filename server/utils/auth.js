const { createAccesToken, createRefreshToken } = require('../helpers/jwt.helper')

const registerTokens = async(res, payload) => {
    const access_token = createAccesToken({id:payload});
	const refresh_token = createRefreshToken({id:payload});
    res.cookie('refreshtoken',refresh_token,{
        httpOnly:true,
        path:'/api/refresh_token',
        maxAge:30*24*60*60*1000
    });
    return {access_token}
}

module.exports = {
    registerTokens
}