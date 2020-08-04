var FormData = require('form-data');
var form = new FormData();
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
                    console.log(data);
                    if(data.ok) {
                        resolve(data);
                    } else {
                        reject(data.error);
                    }
                });
            }
        });


    });
}
async function run() {
    var form = new FormData();
    await submit(form);
}

run();
console.log("___________");
