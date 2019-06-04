import {
Column,
Entity,
PrimaryGeneratedColumn,
PrimaryColumn
} from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

export enum Gender {
    M = "Masculino",
    F = "Femenino"
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
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    public role: UserRole

    @Column({
        type: "enum",
        enum: Gender
    })
    public gender: string

    @Column({ 
        nullable:true,
        length:15,
        name:"telephone"
        })
    public telephone : string | null;

    @Column({ 
        nullable:false,
        name:"date_register"
        })
    public birthdate : Date; 
}