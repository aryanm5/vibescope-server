import { getIdFromUrl, getComments } from '../services/youtube';
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

    return success(comments);
};