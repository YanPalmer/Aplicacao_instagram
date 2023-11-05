import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./entity.User";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.posts /*, {onDelete: 'CASCADE'}*/)
    user: User
}