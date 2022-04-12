const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
// const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, console.log(`Up en 3000`));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.set('view engine', 'handlebars');
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.engine(
    'handlebars',
    exphbs.engine ({
        layoutsDir: __dirname + '/views',
        partialsDir: __dirname + '/views/componentes/',
    })
);

const { nuevoUsuario, getUsuarios, deleteUsuario } = require("./consultas");

app.get('/', (req, res) => {
    res.render('main',{
        layout: 'main',
    })
});

app.get('/user-create', (req,res) => {
    res.render('user-create',{
        layout: 'user-create',
    })
});

app.get('/user-delete/:id', (req,res) => {
    const { id } = req.params;
    res.render('user-delete',{
        layout: 'user-delete',
        idUser:id,
    })
});

// 1. Crear una API con los servicios antes mencionados.
// a. Crear
// b. Listar
// c. Eliminar

app.post('/user', async (req, res) => {
    const { username,email,password1,password2 } = req.body;
    console.log(username,email,password1,password2)
    if (password1 == password2){
        const pass = password1
        const respuesta = await nuevoUsuario(username,email,pass)
        console.log(respuesta[0])
        console.log("Registro exitoso")
    } else {
        console.log('Contraseñas no coinciden')
    }
});

app.get('/users', async (req, res) => {
    const respuesta = await getUsuarios();
    res.send(respuesta)
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteUsuario(id);
    respuesta > 0
    ? res.send(`El usuario ${id} fue eliminado con exito`)
    : res.send("No existe un usuario con ese id")
});

