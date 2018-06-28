const express = require('express');
const expressArtTemplate = require('express-art-template');
const router = require('./routes/router');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log('监听 3000');
})
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
app.engine('html', expressArtTemplate);
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);