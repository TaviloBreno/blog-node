const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!');
    }).catch((error) => {
        console.log(error);
    });

    
app.get('/', (req, res) => {
        res.render( 'index' );
    });

app.use('/', categoriesController);
app.use('/', articlesController);

app.listen(8080, () => {
    console.log('O servidor está rodando!');
});

