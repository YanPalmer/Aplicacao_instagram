import { Request, Response } from "express";
import { AppDataSource } from "../../data-base/data-source";
import { Post } from "../entyti/entity.Post";
import { User } from "../entyti/entity.User";


export async function buscarPostagens(req: Request, res: Response) {
    const id = req.body

    /* SALVA POSTAGENS
    const postagemTeste = new Post();
    postagemTeste.imagem = 444;
    postagemTeste.description = "Uma descrição qualquer";
    postagemTeste.user = id;
    await AppDataSource.getRepository(Post).save(postagemTeste);
    */

    const userPosts = await AppDataSource.getRepository(Post).find({
        where: {
            user: id
        }
    });
    if (userPosts) {
        console.log(userPosts.length);
    } else {
        console.log("Não existem postagens");
    }
    
}