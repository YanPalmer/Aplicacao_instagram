import { AppDataSource, port } from "../data-base/data-source";
import app from "./app";

console.log("Aplicativo iniciando...");

const main = async () => {
    try {
        // Conectando banco de dados
        await AppDataSource.initialize();
        console.log("Banco de dados conectado com sucesso");

        // Iniciando express
        app.listen(port, () => {
            console.log(`Aplicação ouvindo requisições na porta ${port}`);
        })
    } catch (error) {
        console.log(error);
        console.log("Erro na ao iniciar banco")
    }

}

main();