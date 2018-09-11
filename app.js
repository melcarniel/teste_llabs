const express = require('express');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const funcionarios = require('./routes/funcionarios');

//conectando mongoose
mongoose.connect('mongodb://localhost/funcionarioDB', {
    useMongoClient: true
})
.then(() => console.log('MongoDB Conectado'))
.catch(err => console.log(err));


//middleware handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//middleware body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//middleware override
app.use(methodOverride('_method'));

//rota index
app.get('/', (req, res) => {
    res.render('index');
});

//rota principal
app.get('/principal', (req, res) => {
    res.render('principal');
});

app.use('/funcionarios', funcionarios);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor no ar na porta ${port}`)
});