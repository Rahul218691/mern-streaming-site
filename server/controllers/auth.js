const User = require('../models/user')
const { randomNumber } = require('unique-random-number-gen')
const { checkUserExists, createNewUser, checkUserByVerificationCode, updateUserGrantPermission } = require('../dbServices/auth')
const { hashPassword, comparePassword } = require('../helpers/bcrypt.helper')
const { registerTokens } = require('../utils/auth')
const { generateAccountToken, verifyAccountToken, createAccesToken } = require('../helpers/jwt.helper')
const { emailProcessor } = require('../helpers/email.helper')
const { findUserById } = require('../dbServices/user')

const userLogin = async(req, res) => {
    try {
        const {email,password} = req.body;
        const user = await checkUserExists(email);
        if (!user) return res.status(400).json({msg:'User with this email does not exists!'});
        if (!user.isVerified) return res.status(400).json({msg:'Please verify your email to continue'});
        const isPasswordMatch = await comparePassword(password, user.password)
        if (!isPasswordMatch) return res.status(400).json({msg:'Invalid User Credentials'});
        const { access_token } = await registerTokens(res, user._id)
        res.status(200).json({
            msg: 'Login Success',
            access_token,
            user: {
                ...user._doc,
                password: ''
            }
        })
    } catch (error) {
        return res.status(500).json({msg:err.message});
    }
}

const userRegister = async(req, res) => {
    try {
        const {username,email,password} = req.body;
        const user = await checkUserExists(email);
        if (user) return res.status(400).json({msg:'User with this email already exists'});
        const hashData = await hashPassword(password);
        const code = randomNumber()
        const verificationToken = generateAccountToken(code);
        const payload = {
            username,
            email,
            password: hashData,
            verificationToken
        }
        const newUser = await createNewUser(payload)
        if (newUser) {
            emailProcessor({
                to: email,
                verification: verificationToken,
                type: 'email-verification'
            })
            res.status(201).json({msg:'User Registered successfully a mail has been sent to your emailID for verification'});
        }
    } catch (error) {
        return res.status(500).json({msg:err.message});
    }
}

const activateAccount = async(req,res) =>{
	try {
		const {email, verification} = req.body;
		if(!verification) return res.status(400).json({msg:'Invalid user'});
		const user = await checkUserByVerificationCode(email, verification)
		if(!user) return res.status(400).json({msg:'Invalid user'});
		const decode = verifyAccountToken(verification);
		if(typeof(decode) !== undefined){
			await updateUserGrantPermission(email)
			return res.json({
				msg:'Account verified successfully please login to continue'
			});			
		}else{
			return res.status(400).json({
				msg:'Verification link has been expired'
			})			
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const generateAccessToken = async(req,res) =>{
	try {
		const rf_token = req.cookies.refreshtoken;
		if(!rf_token) return res.status(500).json({msg:"Please Login to Continue"});
		const result = verifyRefreshToken(rf_token);
		if(result){
			const user = await findUserById(result.id)
			if(!user){
				return res.status(400).json({msg:'User does not exists'})
			}else{
				const access_token = createAccesToken({id:result.id});
				res.json({
					access_token,
					user
				})
			}
		}else{
			return res.status(400).json({
				msg:'Please Login to Continue'
			})
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const resetPassword = async(req,res) =>{
	try {
		const {email} = req.body;
		const user = await checkUserExists(email);
		if(!user) return res.status(400).json({msg:'User not found'});
		const code = randomNumber();
		user.verification = code;
		await user.save();
		emailProcessor({
			to:email,
			verification:code,
			type:'forgot-password'
		});			
		res.json({
			msg:'Email has been sent to your account to reset password '
		});	
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const logout = async(req,res) =>{
	try {
		res.clearCookie('refreshtoken',{
			path:'/api/refresh_token'
		});
		return res.json({
			msg:'Logged Out!'
		})		
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

module.exports = {
    userLogin,
    userRegister,
    activateAccount,
    generateAccessToken,
    resetPassword,
    logout
}