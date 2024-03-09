const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render( 'index' );
});

app.listen(8080, () => {
    console.log('O servidor está rodando!');
});

