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
let port;
 if(typeof process.env.REACT_APP_FrontendServerPORT==='undefined'){
  port= 9000;
 }
 else{
  port=process.env.REACT_APP_FrontendServerPORT;
 }

console.log("FrontendServer serving at: "+ process.env.REACT_APP_PyEpicsServerBASEURL+":"+port);

 if(typeof process.env.REACT_APP_PyEpicsServerBASEURL==='undefined'){

     app.listen(port);

 }
 else{
   if(process.env.REACT_APP_PyEpicsServerBASEURL.includes('https')){
     https.createServer({
          key: fs.readFileSync('../server.key'),
          cert: fs.readFileSync('../server.cer'),

     }, app).listen(port);

   }
   else{
     app.listen(port);
   }
 }
