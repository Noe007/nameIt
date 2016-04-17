var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');

var pullFunds = JSON.stringify({
  "acquirerCountryCode": "840",
  "acquiringBin": "408999",
  "amount": "124.02",
  "businessApplicationId": "AA",
  "cardAcceptor": {
    "address": {
      "country": "USA",
      "county": "San Mateo",
      "state": "CA",
      "zipCode": "94404"
    },
    "idCode": "ABCD1234ABCD123",
    "name": "Visa Inc. USA-Foster City",
    "terminalId": "ABCD1234"
  },
  "cavv": "0700100038238906000013405823891061668252",
  "foreignExchangeFeeTransaction": "11.99",
  "localTransactionDateTime": "2016-04-17T08:51:43",
  "retrievalReferenceNumber": "330000550000",
  "senderCardExpiryDate": "2015-10",
  "senderCurrencyCode": "USD",
  "senderPrimaryAccountNumber": "4895142232120006",
  "surcharge": "11.99",
  "systemsTraceAuditNumber": "451001"
});
var pushFunds = JSON.stringify({
  "acquirerCountryCode": "840",
  "acquiringBin": "408999",
  "amount": "124.05",
  "businessApplicationId": "AA",
  "cardAcceptor": {
    "address": {
      "country": "USA",
      "county": "San Mateo",
      "state": "CA",
      "zipCode": "94404"
    },
    "idCode": "CA-IDCode-77765",
    "name": "Visa Inc. USA-Foster City",
    "terminalId": "TID-9999"
  },
  "localTransactionDateTime": "2016-04-17T08:52:36",
  "merchantCategoryCode": "6012",
  "pointOfServiceData": {
    "motoECIIndicator": "0",
    "panEntryMode": "90",
    "posConditionCode": "00"
  },
  "recipientName": "rohan",
  "recipientPrimaryAccountNumber": "4957030420210496",
  "retrievalReferenceNumber": "412770451018",
  "senderAccountNumber": "4653459515756154",
  "senderAddress": "901 Metro Center Blvd",
  "senderCity": "Foster City",
  "senderCountryCode": "124",
  "senderName": "Mohammed Qasim",
  "senderReference": "",
  "senderStateCode": "CA",
  "sourceOfFundsCode": "05",
  "systemsTraceAuditNumber": "451018",
  "transactionCurrencyCode": "USD",
  "transactionIdentifier": "381228649430015"
});
var qrPush = JSON.stringify({
    "acquirerCountryCode": "643",
    "acquiringBin": "400171",
    "amount": "124.05",
    "businessApplicationId": "CI",
    "cardAcceptor": {
    "address": {
        "city": "Bangalore",
            "country": "IND"
    },
    "idCode": "ID-Code123",
        "name": "Card Accpector ABC"
},
    "localTransactionDateTime": "2016-04-17T08:53:50",
    "merchantCategoryCode": "4829",
    "recipientPrimaryAccountNumber": "4123640062698797",
    "retrievalReferenceNumber": "430000367618",
    "senderAccountNumber": "4541237895236",
    "senderName": "Mohammed Qasim",
    "senderReference": "1234",
    "systemsTraceAuditNumber": "313042",
    "transactionCurrencyCode": "USD",
    "transactionIdentifier": "381228649430015"
});
var req = request.defaults();
var userId = '4I1QSQRJ3XBDYWF2Y5VN21yiLpV4sIIcsTMIutRWBHUqmi1K8' ;
var password = 'k0OIAJQwn7KG5T3nj9';
var keyFile = 'src/key_mams.pem';
var certificateFile ='src/cert.pem';
var postThis= function(data){
    req.post({
    uri : "https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions",
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(certificateFile),
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : 'Basic ' + new Buffer(userId + ':' + password).toString('base64')
    },
    body: data
  }, function(error, response, body) {
    if (!error) {
      console.log("Response Code: " + response.statusCode);
      console.log("Headers:");
      for(var item in response.headers) {
        console.log(item + ": " + response.headers[item]);
      }
      console.log("Body: "+ body);
    } else {
      console.log("Got error: " + error.message);
    }
  }
);

}


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/index.html', function (req, res) {
    res.send('Hello World!');
});

app.get('/display/post', function(req, res, next) {
if(req.query.id == 1){
//1 is for push
    postThis(pushFunds);
}
    if(req.query.id == 2){
//1 is for push
        postThis(pullFunds);
    }

    if(req.query.id == 3) {

        postThis(qrPush);
    }
    if (req.query.id == 4){
        postThis(qrPull);
    }




console.log(req.query.id);
    wait(1000);
    res.send(200);


});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}