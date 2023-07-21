const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		maxLength:20,
		trim:true,
		required:true,
        index: true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		trim:true,
        index: true
	},
	password:{
		type:String,
		minLength:6,
		required:true,
		trim:true
	},
	profile:{
		type:String,
		default:'https://res.cloudinary.com/rahulcloudstorage/image/upload/v1591775417/images_lg4hyi.png'
	},
	role:{
		type:String,
        enum: ['user','admin'],
		default:'user'
	}
},{
	timestamps:true
})

module.exports = mongoose.model('User', userSchema);