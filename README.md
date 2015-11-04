# gitbook-webhook-middleware

Express middleware to verify GitBook webhooks.

### Installation

```
npm install gitbook-webhook-middleware
```

### Usage

```js
var express = require('express');
var app     = express();
var gitbookMiddleware = require('gitbook-webhook-middleware')({
    secret: process.env.GITBOOK_SECRET
});

app.post('/hooks/gitbook/', gitbookMiddleware, function(req, res) {
    // Only respond to gitbook publish events
    if (req.headers['x-gitbook-event'] != 'publish') return res.status(200).end();

    var payload = req.body.payload;

    // Do something
});
```
