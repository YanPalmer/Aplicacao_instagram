import Express, { request, response } from "express";
import { cadastrarUsuario, validarUsuario } from "./controlers/cadastrarUsuario";
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

app.post('/cadastrarUsuario', cadastrarUsuario);
app.post('/validarUsuario', validarUsuario);

// app.get('/pagina_usuario/:id/:nome/:email', loginUsuario)

export default app;