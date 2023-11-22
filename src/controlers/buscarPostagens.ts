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
    // novaPostagem.imagem = data.postagem.imagem; CONCERTAR DEPOIS
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


export async function carregarPaginaInicial(req: Request, res: Response) {

    // Lógica para randomizar as postagens na PÁGINA WEB

    const dados = await AppDataSource.getRepository(Post).find({
        relations: [
            'user'
        ]
    });
    // console.log(dados, "fim");
    
    const listaDeDados: any[] = [];
    dados.forEach(element => {
        const informacoes = {
            email: element.user.email,
            imagem: element.imagem,
            descricao: element.description
        }
        listaDeDados.push(informacoes)
        // console.log(informacoes)
    });


    // CHAT GPT * * *
    // Função para randomizar uma lista de arrays
    function randomizarLista(lista: Post[]) {
        // Função de comparação aleatória
        const comparacaoAleatoria = () => Math.random() - 0.5;

        // Randomiza a ordem da lista usando a função de comparação aleatória
        return lista.sort(comparacaoAleatoria);
    }
    const listaRandomizada = randomizarLista(listaDeDados);
    // console.log("aqui estão os dados", listaRandomizada, "fim dos dados");
    // CHAT GPT * * *
    // console.log(listaRandomizada)


    return res.status(200).json({
        ok: true,
        message: "Página renderizada com sucesso!",
        dados: listaRandomizada
    })
}