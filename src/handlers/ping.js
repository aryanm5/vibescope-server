import { success } from '../helpers/general';

module.exports.ping = async evt => {

    return success({
        message: 'Hello from Test server!',
        input: evt.queryStringParameters
    });
};