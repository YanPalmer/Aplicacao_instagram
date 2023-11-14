import Express, { request, response } from "express";
import { cadastrarUsuario, validarUsuario } from "./controlers/cadastrarUsuario";
import { buscarPostagens, salvarPostagem } from "./controlers/buscarPostagens";
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

app.post('/cadastrarUsuario', cadastrarUsuario);
app.post('/validarUsuario', validarUsuario);
app.post('/buscarPostagens', buscarPostagens);
app.post('/salvarPostagem', salvarPostagem);

// app.get('/pagina_usuario/:id/:nome/:email', loginUsuario)

export default app;