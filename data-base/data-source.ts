import { DataSource } from "typeorm";

// Configuração do banco de dados

export const port = 3000;
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432, // Porta padrão
    username: "postgres",
    password: "root",
    database: "Instagram_DB" // Nome do banco no Beekeper
})