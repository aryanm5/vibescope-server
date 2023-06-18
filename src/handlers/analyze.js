import { getIdFromUrl, getComments, getVideoInfo } from '../services/youtube';
import { parseRequest, success, error } from '../helpers/general';

module.exports.analyze = async evt => {

    const req = parseRequest(evt);

    // input validation
    if (req.pass === undefined) {
        return error('Password not included.', 401);
    }

    if (req.pass !== process.env.PASS) {
        return error('Incorrect password.', 401);
    }

    const videoId = getIdFromUrl(req.url);

    let comments;
    try {
        comments = await getComments(videoId);
    } catch (err) {
        console.error(err);
        return error(err);
    }

    //send comments to flask here

    let video;
    try {
        video = await getVideoInfo(videoId);
    } catch (err) {
        console.error(err);
        return error(err);
    }

    return success({
        video: {
            title: video.snippet.title,
            publishedAt: video.snippet.publishedAt,
            thumbnail: video.snippet.thumbnails.maxres,
            channelTitle: video.snippet.channelTitle,
            viewCount: video.statistics.viewCount,
            likeCount: video.statistics.likeCount,
            commentCount: video.statistics.commentCount,
        },
        comments,
    });
};