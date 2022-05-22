const express = require('express');
const app = express();
const controller = require('../middleware/document.controller');
const storage = require('../middleware/storage')
const download = require('../middleware/download.controller')


app.post('/upload', controller.uploadFile)

app.get('/download/:filename', download.download)

module.exports = app