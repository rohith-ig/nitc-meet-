const express = require('express');
const next = require('next');
const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  };

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  https.createServer(options, server).listen(3000, '0.0.0.0', () => {
    console.log('Server running on https://<your-ip>:3000');
  });
  
});