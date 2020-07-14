const core = require('@actions/core');
const github = require('@actions/github');
var http = require('http');
var FormData = require('form-data');
var fs = require('fs');


function finishWithError(message) {
    console.log(message);
    core.setFailed(message);
}



function submit(form) {
    return new Promise((resolve, reject) => {
        
        var data = "";
        form.submit("https://slack.com/api/files.upload", (err, res) => {
            if(err) {
                reject(err);
            } else {
                res.on("data", (chunk) => { data += chunk;});
                res.on("end", () => {
                    data = JSON.parse(data);
                    if(data.ok) {
                        resolve(data);
                    } else {
                        finishWithError(data.error);
                        reject(data.error);
                    }
                });
            }
        });


    });
}

async function run() {
    try {
        const token = core.getInput('token');
        const path = core.getInput('path');
        const channel = core.getInput('channel');
        const filename = core.getInput('filename');
        const filetype = core.getInput('filetype');
        const initial_comment = core.getInput('initial_comment');
        const thread_ts = core.getInput('thread_ts');
        const title = core.getInput('title');
        var form = new FormData();
        form.append('token', token);
        form.append('file', fs.createReadStream(path));
        if(filename) form.append('filename', filename);
        if(channel) form.append('channels', channel);
        if(filetype) form.append('filetype', filetype);
        if(initial_comment) form.append('initial_comment', initial_comment);
        if(thread_ts) form.append('thread_ts', thread_ts);
        if(title) form.append('title', title);
        await submit(form);
    } catch (error) {
        finishWithError(error);
    }

}

run()
