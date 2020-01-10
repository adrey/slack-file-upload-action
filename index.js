const core = require('@actions/core');
const github = require('@actions/github');
var http = require('http');
var FormData = require('form-data');
var fs = require('fs');

try {
    const token = core.getInput('token');
    const path = core.getInput('path');
    const channel = core.getInput('channel');
    console.log(`Uploading file ${path} to slack `);
    var form = new FormData();
    form.append('token', token);
    form.append('channels', channel);
    form.append('file', fs.createReadStream(path));
    form.submit("https://slack.com/api/files.upload", function(err, res) {
        console.log(res.statusCode);
        res.resume();
    });
} catch (error) {
    core.setFailed(error.message);
}
