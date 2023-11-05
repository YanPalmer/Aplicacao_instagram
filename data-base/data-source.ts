import { DataSource } from "typeorm";
import { User } from "../src/entyti/entity.User";
import { Post } from "../src/entyti/entity.Post";

// Configuração do banco de dados

export const port = 3000;
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432, // Porta padrão
    username: "postgres",
    password: "root",
    database: "Instagram_DB", // Nome do banco no Beekeper
    entities: [User, Post],
    // Sincroniza com o banco de dados
    synchronize: true
})