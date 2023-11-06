import Express, { request, response } from "express";
import { cadastrarUsuario, loginUsuario, validarUsuario } from "./controlers/cadastrarUsuario";
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

app.post('/cadastrarUsuario', cadastrarUsuario);
app.post('/validarUsuario', validarUsuario);

// app.get('/pages/pagina_inicial/:id/:email/pagina_inicial.html', loginUsuario)

export default app;