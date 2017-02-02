'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const GitHubApi = require("github");
var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    },
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

const restService = express();
restService.use(bodyParser.json());





restService.post('/webhook',function(req,res){
    console.log('hook request');
    try{
        console.log(process.env.CLIENTID);
        console.log(process.env.SECRET);
    }catch(err){
        console.log(err);
    }
    // oauth key/secret (to get a token)
    github.authenticate({
            type: "oauth",
            key: process.env.CLIENTID,
            secret: process.env.SECRET
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
                    var result={};
                    result.push({speech:err,displayText:err,source:'apiai-webhook-sample'})
                    return JSON.stringify(result);
                    
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
