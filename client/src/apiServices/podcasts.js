import { getDataAPI } from 'utils/axiosConfig';

export const getPodcastItems = (payload) => {
	return new Promise(async(resolve,reject) =>{
		try {
            let url = `getPodcasts?page=${payload.page}&limit=${payload.pageLimit}`
            if (!!payload?.term) {
                url = `${url}&term=${payload.term}`
            }
			const {data} = await getDataAPI(url);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}


export const getPodcastPlaylist = (feed) => {
	return new Promise(async(resolve,reject) =>{
		try {
            let url = `getPodcastPlaylist?playerFeed=${feed}`
			const {data} = await getDataAPI(url);
			resolve(data);
		} catch(error) {
			reject(error);
		}
	})
}
