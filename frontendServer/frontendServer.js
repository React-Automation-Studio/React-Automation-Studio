require('dotenv').config()
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
console.log("FrontendServer: ",process.env)
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

let URL;
 if(typeof process.env.REACT_APP_PyEpicsServerBASEURL==='undefined'){
  URL= "http://127.0.0.1";
 }
 else{
  URL=process.env.REACT_APP_PyEpicsServerBASEURL;
 }

console.log("FrontendServer serving at: "+ URL+":"+port);


   if(URL.includes('https')){
     https.createServer({
          key: fs.readFileSync('../server.key'),
          cert: fs.readFileSync('../server.cer'),

     }, app).listen(port);

   }
   else{
     app.listen(port);
   }
