import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult } from "typeorm";

import { Trademark } from "./../../entities/trademark.entity";
import { TrademarkDto } from "./dto/trademark.dto";
import { Files } from "../common/files/files";

@Injectable()
export class TrademarkService {
    constructor(
        @InjectRepository(Trademark)
        private readonly repository: Repository<Trademark>
    ) { }

    public async createTrademark(trademark: TrademarkDto, fileurl: string): Promise<boolean> {
        const res: Trademark = await this.repository.findOne({name : trademark.name});
        console.log(res)
        if( !res){
            await  this.repository.insert({ name : trademark.name, img: fileurl, state: 'Activo' });
            return true;
        }
        return false;
    }

    public async listTrademark(): Promise<Trademark[]> {
        return this.repository.find();
    }

    public async findByName(name: string): Promise<Trademark> {
        return await this.repository.findOne({name: name});
    }

    public async updateTrademark(trademark: TrademarkDto, name: string): Promise<boolean> {
        const res:UpdateResult = await this.repository
            .createQueryBuilder()
            .update(Trademark)
            .set({ name : trademark.name})
            .where("name = :name",{name : name})
            .execute()
        ;
        return (res.raw.affectedRows > 0);
    }

    public async deleteTrademark(id: number): Promise<boolean> {
        const res: DeleteResult = await this.repository.delete(id);
        if(res.affected > 0){
            const path = await this.repository.findOne(id);
            const file = new Files();
            return file.deleteFile(file.prepareFile([path.img]));
        }
        return false;
    }
}