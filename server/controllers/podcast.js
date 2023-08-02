const axios = require('axios')
const { parseString } = require('xml2js');
const { getCache, setCache, deleteCache } = require("../utils/nodeCaching")


const getPodcasts = async(req, res) => {
    try {
        let { page, lang, term, country, media, limit, entity } = req.query
        country = country ? country : 'IN'
        lang = lang ? lang : 'en_us'
        entity = entity ? entity : 'podcast'
        media = media ? media : 'podcast'
        term = term ? term : 'trending'
        page = page ? page : 1
        limit = limit ? limit : 25
        const offset = (page - 1) * limit
        const key = `podcast_${term}_${country}_${page}`
        const checkCacheData = await getCache(key)
        if (checkCacheData) {
            return res.status(304).json({
                podcasts: JSON.parse(checkCacheData)
            })
        }
        const url = `${process.env.ITUNES_BASE_URL}/search?term=${term}&country=${country}&media=${media}&entity=${entity}&offset=${offset}&limit=${limit}&lang=${lang}`
        const { data } = await axios({
            url,
            method: 'get',
            options: {
                headers:{
                    Accept:'application/json'
                }
            }
        })
        const { results } = data;
        const podcasts = results.map(podcast => {
            return{
                name:podcast.artistName,
                trackName:podcast.trackName,
                poster:podcast.artworkUrl600,
                genre:podcast.primaryGenreName,
                feedUrl:podcast.feedUrl,
                postedDate: podcast.releaseDate
            }
        });
        await setCache(key, JSON.stringify(podcasts))
        res.status(200).json({
            podcasts
        });
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

const getPodcastPlaylist = async(req, res) => {
    try {
        const { playerFeed } = req.query
        if (!playerFeed) return res.status(400).json({msg: 'Playlist not found'})
        const checkCacheData = await getCache(playerFeed)
        if (checkCacheData) {
            return res.status(304).json({
                playlist: JSON.parse(checkCacheData)
            })
        }
        const {data} = await axios({
			url: playerFeed,
			method:'GET'
		});
        parseString(data, async(err,json) =>{
			if(err) return res.status(400).json({msg:'Failed to parse xml'});
			const {rss} = json;
			const {channel} = rss;
            const data = channel[0]
            const extractData = data.item.map((res, index) => {
                return {
                    id: index + 1,
                    title: res.title[0],
                    audioHTTPUrl: res.enclosure ? res.enclosure[0]?.$.url : '',
                    audioSecureUrl: res['ppg:enclosureSecure'] ? res['ppg:enclosureSecure'][0]?.$.url : '',
                    podcastPublishDate: res.pubDate[0]
                }
            })
            const payload = {
                mainTitle: data['itunes:author'][0],
                mainDescription: data.description[0],
                podcastImage: data.image[0].url[0],
                publishedDate: data.pubDate ? data.pubDate[0] : data.lastBuildDate ? data.lastBuildDate[0] : '',
                items: extractData
            }
            await setCache(playerFeed, JSON.stringify(payload))
			res.status(200).json({
                playlist: payload
            })
		})
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports = {
    getPodcasts,
    getPodcastPlaylist
}