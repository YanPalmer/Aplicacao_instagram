import Express, { request, response } from "express";
import { cadastrarUsuario } from "./controlers/cadastrarUsuario";
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

app.post('/cadastrarUsuario', cadastrarUsuario)

export default app;