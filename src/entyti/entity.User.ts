import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./entity.Post";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    // Implementar
    // @Column()
    // bio: string;

    // Implementar
    // @Column()
    // seguidores: number;

    @OneToMany(() => Post, post =>  post.user)
    posts: Post[];
}