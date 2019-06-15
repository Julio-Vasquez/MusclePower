import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Trademark } from "./../../entities/trademark.entity";
import { Repository } from "typeorm";
import { TrademarkDto } from "./dto/trademark.dto";

@Injectable()
export class TrademarkService {
    constructor(
        @InjectRepository(Trademark)
        private readonly repository: Repository<Trademark>
    ) { }

    public async createTrademark(trademarkDto: TrademarkDto): Promise<boolean> {
        return;
    }

    public async listTrademark(): Promise<Trademark[]> {
        return;
    }

    public async findByName(name: string): Promise<Trademark> {
        return;
    }

    public async updateTrademark(trademark: TrademarkDto, name: string): Promise<boolean> {
        return;
    }

    public async deleteTrademark(id: number): Promise<boolean> {
        return;
    }
}