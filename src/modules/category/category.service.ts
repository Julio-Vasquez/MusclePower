import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './../../entities/category.entity';
import { CategoryDto } from './dto/category.dto';
import { Query } from 'typeorm/driver/Query';


@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>
    ){}

    public async createCategory(category: CategoryDto): Promise<boolean>{
        try{
            this.repository.createQueryBuilder()
            .insert()
            .into(Category)
            .values([{ name: category.name, state: category.state}])
            .execute();
        }catch(err){
            return false;
        }
        return true;
    }

    public async createCategory2(category: CategoryDto): Promise<boolean>{
        try{
           let res = await this.repository.query(`CALL Insert_Category('${category.name}')`);
           
            console.log(res.affectedRows)
        }catch(err){
            return false;
        }
        return true;
    }
}