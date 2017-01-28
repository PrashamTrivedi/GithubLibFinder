'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const restService = express();
restService.use(bodyParser.json());

restService.post('/webhook',function(req,res){
    console.log('hook request');
     var speech = 'empty speech';
    if(req.body){
        var requestBody = req.body;
        if(requestBody.result){
            console.log(requestBody.result)
            if(requestBody.result.parameters){
                var parameters = requestBody.result.parameters;
                 if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if(parameters.Tech){
                    console.log("Tech Object is "+parameters.Tech)
                    speech +='Tech: '+parameters.Tech;
                    speech += ' ';
                }
                if(parameters.Functionality){
                    console.log("Functionality Object is "+parameters.Functionality)
                    speech +='Functionality: '+parameters.Functionality;
                    speech += ' ';
                }
                if(parameters.Keyword){
                    console.log("Keyword Object is "+parameters.Keyword)
                    speech +='Keywords: '+parameters.Keyword;
                    speech += ' ';
                }
                
            }
        }
          return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    }
})

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
