import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable} from "typeorm";
import { Post } from "./Post";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Post, post => post.categories)
    @JoinTable()
    posts: Post[];
}