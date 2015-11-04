var bodyParser = require('body-parser');
var crypto = require('crypto');

function signBlob(key, blob) {
    return 'sha1=' + crypto.createHmac('sha1', key).update(blob).digest('hex');
}

module.exports = function(options) {
    options = options || { secret: '' };

    if (typeof options.secret != 'string')
        throw new TypeError('must provide a \'secret\' option');

    return bodyParser.json({
        verify: function(req, res, buffer) {
            if (!req.headers['x-gitbook-signature'])
                throw new Error('No X-GitBook-Signature found on request');

            if (!req.headers['x-gitbook-event'])
                throw new Error('No X-GitBook-Event found on request');

            if (!req.headers['x-gitbook-delivery'])
                throw new Error('No X-GitBook-Delivery found on request');

            var received_sig = req.headers['x-gitbook-signature'];
            var computed_sig = signBlob(options.secret, buffer);

            if (received_sig != computed_sig) {
                throw new Error('Invalid Signature');
            }
        }
    });
};