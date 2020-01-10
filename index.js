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
    console.log(form.getHeaders())
    form.submit("https://slack.com/api/files.upload", function(err, res) {
        console.log(res.statusCode);
        res.resume();
    });
} catch (error) {
    core.setFailed(error.message);
}
