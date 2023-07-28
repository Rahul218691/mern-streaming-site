const { createStream } = require("../dbServices/stream");

const createNewStream = async(req, res) => {
    try {
        if(!req.file) return res.status(400).json({msg:'No Files selected'});
        const fileURL = `${process.env.SERVER_BASE_URL}/posters/${req.file.filename}`;
        const payload = {
            ...req.body,
            user: req.user._id,
            streamPoster: fileURL
        }
        await createStream(payload)
        res.status(201).json({
            msg: 'Stream created Successfully!'
        })
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}

module.exports = {
    createNewStream
}