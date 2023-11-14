import { Request, Response } from "express";
import { AppDataSource } from "../../data-base/data-source";
import { Post } from "../entyti/entity.Post";
import { User } from "../entyti/entity.User";


export async function buscarPostagens(req: Request, res: Response) {
    const id = req.body

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

export async function salvarPostagem(req: Request, res: Response) {
    const data = req.body;
    // console.log(data.id, data.postagem.imagem, data.postagem.descricao);

    // SALVA POSTAGENS
    const novaPostagem = new Post();
    novaPostagem.imagem = data.postagem.imagem;
    novaPostagem.description = data.postagem.descricao;
    novaPostagem.user = data.id;
    const postagemCriada = await AppDataSource.getRepository(Post).save(novaPostagem);

    console.log(postagemCriada);
    return res.status(201).json({
        ok: true,
        message: "Postagem criada com sucesso",
        body: postagemCriada
    });

}