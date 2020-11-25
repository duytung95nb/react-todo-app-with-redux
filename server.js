const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
const dir = `${__dirname}/dist/`;
app.use(express.static(`dist`));
app.get('/', function(req, res) {
  res.sendfile(`${dir}/index.html`);
});
const port = 3000;
console.log(`App is listening at port ${port}`)
app.listen(port);