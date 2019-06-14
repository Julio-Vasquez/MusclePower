import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './../../entities/category.entity';
import { CategoryDto } from './dto/category.dto';


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
            .values([{ name: category.name, state: 'Activo'}])
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

    public async listCategory(): Promise<Category[]>
    {
       try 
       {
           return await this.repository.find();
       } 
       catch (error) 
       {
           return [];
       }
    }


    public async updateCategory(name: string, category: CategoryDto): Promise<boolean>
    {
        return;
    }

    public async deleteCategory(id :  number): Promise<boolean>
    {
  
        let res =await this.repository.delete(id);
        console.log(res.affected);
        return (res.affected > 0)? true: false;
  
    

    }
}