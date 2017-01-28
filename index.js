'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const restService = express();
restService.use(bodyParser.json());

restService.post('/webhook',function(req,res){
    console.log('hook request');
    if(req.body){
        if(req.body.result){
            if(req.body.result.parameters){
                if(req.body.parameters.Tech){
                    console.log("Tech Object is "+req.body.parameters.Tech)
                }
                if(req.body.parameters.Functionality){
                    console.log("Functionality Object is "+req.body.parameters.Functionality)
                }
                if(req.body.parameters.Keyword){
                    console.log("Keyword Object is "+req.body.parameters.Keyword)
                }
                
            }
        }
    }
})

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
