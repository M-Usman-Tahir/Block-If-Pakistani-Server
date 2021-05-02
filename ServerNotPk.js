const express = require('express')
const cors = require('cors');
const request = require('request');
// const { exitCode } = require('process');

let app = express();

app.listen(8888, function(err, res) {
    console.log("server is running at http://127.0.0.1:8888\nGo CTRL + MouseClick at http://127.0.0.1:8888/get")
});

app.use(cors());

const middleware_auth = (req, res, next) => {
    request({
        url: "https://www.ipapi.co/json/",
        json: true
    }, (err, response, body) => {
        if(!err && response.statusCode == 200){
            console.log(body.country_name);
            if (body.country_name == "Pakistan"){
                // "You are Not allowed!"
                res.status(404).end();
            }
            else{
                next();
            }
        }
    });
}

app.use(middleware_auth);

app.get("/get", (request, response)=>{
    let res = {"message" : "You are allowed to this web page"};
    response.send(res.message);
});