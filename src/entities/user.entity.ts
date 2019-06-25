import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

export enum UserRole {
    Admin= 'admin',
    User = 'user'
}

export enum State 
{
    Activo ='Activo',
    Inactivo = 'Inactivo'
}

@Entity("User")
export class User {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    @PrimaryColumn()
    public id : number;
        

    @Column({ 
        nullable:false,
        length:60,
        name:"names"
        })
    public names : string;
        

    @Column({ 
        nullable:false,
        length:60,
        name:"lastnames"
        })
    public lastnames : string;
        

    @Column({ 
        nullable:false,
        length:255,
        name:"email"
        })
    public email : string;
        

    @Column({
        nullable: false,
        name:"password"
    })
    public password : string


    @Column({ 
        nullable:true,
        length:15,
        name:"telephone"
        })
    public telephone : string | null;


    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.User
    })
    public role: string;

    @Column({
        nullable: false,
        type : "enum",
        enum: State
    })
    public state: string;
}