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

    // Procura no banco se existem posts com o ID recebido
    const userPosts = await AppDataSource.getRepository(Post).find({
        where: {
            user: id
        }
    });
    
    if (userPosts.length != 0) {
        console.log(`Usuário de ID: ${req.body.id} tem ${userPosts.length} postagens`);
        
        // Devo apresentar as postagens na tela do usuário
        return res.status(200).json({
            ok: true,
            message: "Enviando postagens para a página do usuário",
            body: userPosts
        })


    } else {
        console.log(`Usuário de ID: ${req.body.id} não tem postagens`);
        return res.status(500).json({
            ok: false,
            message: "Nenhuma postagem encontrada",
            body: userPosts
        })
    }
    
}