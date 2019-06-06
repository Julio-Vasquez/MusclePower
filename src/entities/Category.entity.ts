import { Column, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";

import { Product } from "./product.entity";


export  enum State 
{
    Activo ='Activo',
    Inactivo = 'Inactivo'
}

@Entity()
export class Category
{

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
    })
    @PrimaryColumn()
    id : number;

    @Column({
        nullable: false,
        type: "varchar",
        name: 'name',
        length: 150
    })
    name : string;

    @Column({
        nullable: false,
        type : "enum",
        enum: State,
        name: "state"
    })
    state: string;

    @OneToMany(type => Product, product => product.category)
    products: Product[];

}