import { Injectable } from '@nestjs/common';
import { Repository, Like, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './dto/user.dto';

import { User } from 'src/entities/user.entity';
import { ChangePasswordDto } from './dto/changepassword.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) { }

    public async ListUsers() {
        return await this.repository.find();
    }

    public async findByName(name: string): Promise<User[]> {
        return await this.repository
            .createQueryBuilder("user")
            .select("user.id","idUser")
            .addSelect("user.names", "namesUser")
            .addSelect("user.lastnames", "lastnamesUser")
            .addSelect("user.email", "emailUser")
            .addSelect("user.telephone", "telUser")
            .addSelect("user.role", "rolUser")
            .where("user.names like :names", { names: '%' + name + '%' })
            .andWhere("user.state ='Activo'")
            .execute()
        ;
    }

    public async changePassword(newPassword: ChangePasswordDto): Promise<boolean> {
        const res:UpdateResult = await this.repository
            .createQueryBuilder("user")
            .update(User)
            .set({password: `PASSWORD(${newPassword.password})`})
            .where("user.email = :email",{ email: newPassword.email })
            .execute()
        ;
        return (res.raw.affectedRows > 0);
    }

    public async updateUser(newUser: UserDto, email:string ):Promise<boolean> {
        const res:UpdateResult = await this.repository
            .createQueryBuilder("user")
            .update(User)
            .set({
                names: newUser.names,
                lastnames: newUser.lastNames,
                telephone: newUser.telephone
            })
            .where("user.email = :email",{email: email})
            .execute();
        return (res.raw.affectedRows > 0);
    }

    public async deleteUser(id: number) {
        const res: DeleteResult = await this.repository.delete(id);
        return(res.affected > 0);
    }

    public async validUser(jwt: any): Promise<any> {
        console.log(jwt.idUser)
        let res = await this.repository
            .createQueryBuilder("user")
            .select("user.id", "idUser")
            .addSelect("user.names", "namesUser")
            .addSelect("user.email", "emailUser")
            .where("user.id = :id", { id: jwt.id })
            .limit(1)
            .execute()
        ;
        return (res.length > 0) ? jwt : false;
    }
}