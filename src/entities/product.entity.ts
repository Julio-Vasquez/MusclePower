import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { Category } from './category.entity';
import { Trademark } from './trademark.entity';

export  enum State 
{
    Activo ='Activo',
    Inactivo = 'Inactivo'
}

@Entity()
export class Product
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

    @Column({
        nullable: false,
        type: "text",
        name: "description"
    })
    description : string;

    @Column({
        nullable: false,
        type: "numeric",
        name: "price"
    })
    price : number;

    @Column({
        nullable: false,
        type: "int",
        name: "cant"
    })
    cant : number;

    @Column({
        nullable: false,
        type: "text",
        name: "adictionalInformation"
    })
    adictionalInformation : string;

    @Column({
        nullable: false,
        type: "text",
        name: "imgProduct"
    })
    imgProduct : string;

    @Column({
        nullable: false,
        type: "text",
        name: "imgNutritionalTable"
    })
    imgNutritionalTable : string;

    @ManyToOne(type => Category, category => category.products, { nullable: false,onDelete: 'CASCADE',onUpdate: 'CASCADE'})
    @JoinColumn({ name: 'category'})
    @Column({
        type: Number
    })
    category: Category;
    
    @ManyToOne(type => Trademark, trademark => trademark.products, { nullable: false,onDelete: 'CASCADE',onUpdate: 'CASCADE'})
    @JoinColumn({ name: 'trademark'})
    @Column({
        type:Number
    })
    trademark: Trademark;

   
}
