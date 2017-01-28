'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const restService = express();
restService.use(bodyParser.json());

restService.post('/webhook',function(req,res){
    console.log('hook request');
     var speech = 'empty speech';
    if(req.body){
        if(req.body.result){
            console.log(req.body.result)
            if(req.body.result.parameters){
                 if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if(req.body.parameters.Tech){
                    console.log("Tech Object is "+req.body.parameters.Tech)
                    speech +='Tech: '+req.body.parameters.Tech;
                    speech += ' ';
                }
                if(req.body.parameters.Functionality){
                    console.log("Functionality Object is "+req.body.parameters.Functionality)
                    speech +='Functionality: '+req.body.parameters.Functionality;
                    speech += ' ';
                }
                if(req.body.parameters.Keyword){
                    console.log("Keyword Object is "+req.body.parameters.Keyword)
                    speech +='Keywords: '+req.body.parameters.Keyword;
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
