'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const restService = express();
restService.use(bodyParser.json());

restService.post('/webhook',function(req,res){
    console.log('hook request');
    if(req.body){
        console.log(req.body);
    }
})

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
