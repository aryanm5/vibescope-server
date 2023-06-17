import { parseRequest, success, error } from '../../helpers/general';

module.exports.analyze = async evt => {

    const req = parseRequest(evt);

    // input validation
    if (req.pass === undefined) {
        return error('Password not included.', 401);
    }

    if (req.pass !== process.env.PASS) {
        return error('Incorrect password.', 401);
    }

    return success({ message: 'analyzed!' });
};