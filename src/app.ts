import Express, { request, response } from "express";
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

export default app;