import { postDataAPI } from 'utils/axiosConfig';

export const UserRegister = (userdata) => {
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('register',userdata);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const UserLogin = (userdata) => {
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('login',userdata);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const VerifyUserAccount = (payload) => {
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('verifyAccount',payload);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const refreshToken = (payload) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('refresh_token', payload);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}

export const userLogout = (userid) => {
	console.log(userid)
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await postDataAPI('logout', {
				userId: userid
			});
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}