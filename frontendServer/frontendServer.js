require('dotenv').config()
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, '../build', 'index.html'));
 });


 if(typeof process.env.REACT_APP_PyEpicsServerURL==='undefined'){

   app.listen(9000);
 }
 else{
   if(process.env.REACT_APP_PyEpicsServerURL.includes('https')){
     https.createServer({
          key: fs.readFileSync('../server.key'),
          cert: fs.readFileSync('../server.cer'),

     }, app).listen(9000);

   }
   else{
     app.listen(9000);
   }
 }
