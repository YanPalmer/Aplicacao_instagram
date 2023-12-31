import { Request, Response } from "express";
import { User } from "../entyti/entity.User";
import { AppDataSource } from "../../data-base/data-source";

export async function cadastrarUsuario(req: Request, res: Response) {
    console.log("Cadastrando...");
    // console.log(req.body);
    const data = req.body
    try {
        // Verificar no banco de dados se o email inserido EXISTE
        const userDB_email = await AppDataSource.getRepository(User).findOne({
            where: { email: data.email }
        })
        // Se o email não existir, cria um novo usuário e atribui uma página
        if (userDB_email === null) {
            const user = new User();
            user.name = data.name;
            user.email = data.email;
            user.password = data.password;
            // console.log(user);

            await AppDataSource.getRepository(User).save(user);

            return res.status(201).json({
                ok: true,
                message: "User created!",
                redirect: true
            })


        } else {
            return res.status(409).json({
                ok: false,
                message: `O email "${data.email}" já existe no banco de dados!`,
                redirect: false
            })
        }



    } catch (error) {
        console.error("Erro ao cadastra usuário");
    }
}

export async function validarUsuario(req: Request, res: Response) {
    console.log("Validando...");
    const data = req.body;
    // console.log(data);
    try {
        const userDB_email = await AppDataSource.getRepository(User).findOne({
            where: {
                email: data.email
            }
        })
        // Verifica se o email e senha são iguais ao do banco de dados
        if ((userDB_email?.email === data.email) && (userDB_email?.password === data.password)) {
            console.log("Usuário logado com sucesso");
            return res.status(200).json({
                ok: true,
                message: "Usuário logado",
                redirect: true,
                body: {
                    id: userDB_email?.id,
                    name: userDB_email?.name,
                    email: userDB_email?.email
                }
            })
        } else if ((userDB_email?.email === data.email) && (data.password != userDB_email?.password)) {
            return res.status(500).json({
                ok: false,
                message: "Senha não corresponde",
                redirect: false
            })
        } else if (userDB_email?.email != data.email) {
            return res.status(500).json({
                ok: false,
                message: "Email não existente!",
                redirect: false
            })
        }

    } catch (error) {
        console.error("Erro ao validar usuário", error);
    }
}

/*
// Aqui devo enviar os dados do usuário
export async function loginUsuario(req: Request, res: Response) {
    const data = req.body;
    console.log(data)
    res.status(200).json({
        ok: true,
        message: "Usuário logado",
        dados: data
    })
    // try {
    //     const user = await AppDataSource.getRepository(User).findOne({
    //         where: { id: parseInt(idUsuario) }
    //     });

    //     res.status(200).json({
    //         ok: true,
    //         message: "Users found",
    //         users: users
    //     })
    // } catch (error) {
    //     console.log("Ocorreu um erro: ", error)
    // }
}*/