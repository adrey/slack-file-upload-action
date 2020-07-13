const fetch = require('isomorphic-fetch');
const index = require("../index.js");
test("Sample test", () => {
    console.log("testing...");
});

test("Successful response from github", () => {
    var data = { "ok" : true };
    var blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    var res = new Response(blob, {"status": 200});
    res.resume = () => {};
    index.processResponse(null, res);
    
});

test("Response with error from github", () => {
    var data = { "ok" : false, "error": "github" };
    var blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
    var res = new Response(blob, {"status": 200});
    res.resume = () => {};
    var process = () => {index.processResponse(null, res);};
    expect(process).toThrow("github");
});
