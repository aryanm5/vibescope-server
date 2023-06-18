// youtube service
const { google } = require('googleapis');

const key = process.env.YTKEY;

const service = google.youtube({
    version: 'v3',
    auth: key
});


const getIdFromUrl = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
};

const getComments = async id => {
    const response = await service.commentThreads.list({
        part: 'snippet',
        videoId: id,
        maxResults: 100,
        order: 'relevance',
        textFormat: 'plainText',
    });

    return response.data.items.map(c => c.snippet.topLevelComment.snippet.textDisplay.replace(/\*+/g, '').replace(/\n+/g, ''));
};

const getVideoInfo = async id => {
    const response = await service.videos.list({
        part: [
            'snippet',
            'statistics'
        ],
        id,
    })

    return response.data.items[0];
};

export { getIdFromUrl, getComments, getVideoInfo };