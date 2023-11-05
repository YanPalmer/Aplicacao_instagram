import { Request, Response } from "express";
import { User } from "../entyti/entity.User";
import { AppDataSource } from "../../data-base/data-source";

export async function cadastrarUsuario(req: Request, res: Response) {
    console.log("Cadastrando...");
    // console.log(req.body);
    const data = req.body
    try {
        // Verificar no banco de dados se o email inserido EXISTE
        const userDB = await AppDataSource.getRepository(User).findOne({
            where: { email: data.email }
        })
        if (userDB === null) {
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
                message: "O valor recebido na solicitação já existe no banco de dados!",
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
        const userDB = await AppDataSource.getRepository(User).findOne({
            where: {
                email: data.email
            }
        })
        
        if ((userDB?.email === data.email) && (userDB?.password === data.password)) {
            return res.status(200).json({
                ok: true,
                message: "User validated",
                body: {
                    name: userDB?.name,
                    email: userDB?.email
                },
                redirect: true
            });
        } else if ((userDB?.email === data.email) && (data.password != userDB?.password)) {
            return res.status(500).json({
                ok: false,
                message: "Senha não corresponde",
                redirect: false
            })
        } else if (userDB?.email != data.email) {
            return res.status(500).json({
                ok: false,
                message: "Email não existente!",
                redirect: false
            })
        }

    } catch (error) {
        console.error("Erro ao validar usuário")
    }
}