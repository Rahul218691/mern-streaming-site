
export const streamCreate = (instance, payload) => {
	return new Promise(async(resolve,reject) =>{
		try {
			const {data} = await instance.post('/api/createStream',payload);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}
