const {google} = require('googleapis');

const GOOGLE_CLIENT_ID = '169216277182-vm697dsul8o0fkcpn9di68lt380aujej.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

exports.Oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,   
    GOOGLE_CLIENT_SECRET,
    'postmessage'
)