export const validateStreamDetails = ({
    title,
    description,
    streamDate,
    streamTime,
    streamType,
    streamCost,
    streamPoster
}) => {
    const errors = {}

    if (!title) {
        errors['title'] = 'Please provide title'
    }
    if (!description) {
        errors['description'] = 'Stream Description is required'
    }
    if (!streamDate) {
        errors['streamDate'] = 'Stream Date is required'
    }
    if (!streamTime) {
        errors['streamTime'] = 'Stream Time is required'
    }
    if (!streamType) {
        errors['streamType'] = 'Stream Type is required'
    }
    if (streamType && !streamCost) {
        errors['streamCost'] = 'Stream Cost is required'
    }
    if (!streamPoster || streamPoster === null) {
        errors['streamPoster'] = 'Please add a poster Image'
    }
    if (streamPoster && !streamPoster.name.match(/\.(jpg|jpeg|png)$/)) {
        errors['streamPoster'] = 'Only JPG|JPEG|PNG formats allowed'
    }
    return errors
}


export const imageValidation = (image) => {
    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
        return 'Only JPG|JPEG|PNG formats allowed'
    }
}