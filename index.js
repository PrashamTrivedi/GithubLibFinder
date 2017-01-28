'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const GitHubApi = require("github");

const restService = express();
restService.use(bodyParser.json());
var config = require('./keys.json');





restService.post('/webhook',function(req,res){
    console.log('hook request');
    // oauth key/secret (to get a token)
    github.authenticate({
            type: "oauth",
            key: process.env.CLIENTID || config.githubClientId,
            secret: process.env.SECRET || config.githubSecret
    })
     var speech = 'empty speech';
     var topic = '';
     var functionality = '';
     var keyword = '';
     var language = ''; 
    if(req.body){
        var requestBody = req.body;
        if(requestBody.result){
            console.log(requestBody.result)
            if(requestBody.result.parameters){
                var parameters = requestBody.result.parameters;
                 if (requestBody.result.fulfillment) {
                     
                    speech = requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if(parameters.Language){
                    language = parameters.Language;
                    console.log("Language Object is "+parameters.Language)
                    speech +='Searched in these Language: '+parameters.Language;
                    speech += ' ';
                }
                if(parameters.Tech){
                    topic = parameters.Tech;
                    console.log("Tech Object is "+parameters.Tech)
                                    }
                if(parameters.Functionality){
                    functionality = parameters.Functionality;
                    console.log("Functionality Object is "+parameters.Functionality)
                    
                }
                if(parameters.Keyword){
                    keyword = parameters.Keyword;
                    console.log("Keyword Object is "+parameters.Keyword)
                    speech +='Searched in these Keywords: '+parameters.Keyword;
                    speech += ' ';
                }
                
            }
        }

        if(speech){
            github.search.code({
                q:keyword+' '+functionality+' '+topic+' language:'+language,
            },function(err,res){
                if(!err){
                    return res.json({
                        speech: res,
                        displayText: res,
                        source: 'apiai-webhook-sample'
                    });
                }else{
                    return res.json({
                        speech: err,
                        displayText: err,
                        source: 'apiai-webhook-sample'
                    });
                    
                }
            })   
        }else{
            return res.json({
                speech: speech,
                displayText: speech,
                source: 'apiai-webhook-sample'
            });
        }
    }
})

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
