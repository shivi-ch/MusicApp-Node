var express = require('express');
var todoController = require('./controllers/musiccontrollers');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));

todoController(app);

app.listen(port);
console.log('listening on port 3000');