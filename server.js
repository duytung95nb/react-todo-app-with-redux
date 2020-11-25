const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
const dir = `${__dirname}/dist/`;
const contacts = [
  {
    id: 1,
    name: 'Tung Dao 1'
  },{
    id: 2,
    name: 'Tung Dao 2'
  },{
    id: 3,
    name: 'Tung Dao 3'
  },{
    id: 4,
    name: 'Tung Dao 4'
  },{
    id: 5,
    name: 'Tung Dao 5'
  },{
    id: 6,
    name: 'Tung Dao 6'
  },
]
app.use(express.static(`dist`));
app.get('/', function(req, res) {
  res.sendfile(`${dir}/index.html`);
});
app.get('/contacts', (req, res) => {
  res.status(200).json(contacts);
});
const port = 3000;
console.log(`App is listening at port ${port}`)
app.listen(port);