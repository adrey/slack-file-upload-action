const core = require('@actions/core');
const github = require('@actions/github');
var http = require('http');
var FormData = require('form-data');
var fs = require('fs');

try {
    const token = core.getInput('token');
    const path = core.getInput('path');
    console.log(`Uploading file ${path} to slack `);
    var form = new FormData();
    form.append('token', token);
    form.append('channels', "general");
    form.append('file', fs.createReadStream(path));

    var request = http.request({
        method: 'post',
        host: 'https://slack.com',
        path: '/api/files.upload',
        headers: form.getHeaders()
    });
 
    form.pipe(request);
 
    request.on('response', function(res) {
        console.log(res.statusCode);
    });

} catch (error) {
    core.setFailed(error.message);
}
