const parseRequest = event =>
    event.body === undefined ? {} : JSON.parse(event.body);

const success = body => ({
    statusCode: 200,
    body: JSON.stringify(body),
});

const error = (message, statusCode = 500) => ({
    statusCode,
    body: JSON.stringify({ message }),
});

export { parseRequest, success, error };