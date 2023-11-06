import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./entity.User";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imagem: number;
    // imagem: Imagem;

    @Column()
    description: string;

    // @CreateDateColumn()
    // created_at: Date;

    @ManyToOne(() => User, user => user.posts /*, {onDelete: 'CASCADE'}*/)
    user: User
}