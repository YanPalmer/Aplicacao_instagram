import Express, { request, response } from "express";
import { cadastrarUsuario, validarUsuario } from "./controlers/cadastrarUsuario";
import { buscarPostagens, carregarPaginaInicial, salvarPostagem } from "./controlers/buscarPostagens";
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.post('/cadastrarUsuario', cadastrarUsuario);
app.post('/validarUsuario', validarUsuario);

app.post('/buscarPostagens', buscarPostagens);
app.post('/salvarPostagem', salvarPostagem);

app.get('/carregarPaginaInicial', carregarPaginaInicial);

// app.get('/pagina_usuario/:id/:nome/:email', loginUsuario)

export default app;