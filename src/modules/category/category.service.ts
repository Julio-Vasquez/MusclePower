import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './../../entities/category.entity';
import { CategoryDto } from './dto/category.dto';


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>
    ) { }

    public async createCategory(category: CategoryDto): Promise<boolean> {
        const res: Category = await this.repository.findOne({ name: `${category.name}` });
        if (res === undefined) {
            this.repository.insert({ name: category.name, state: 'Activo' });
            return true;
        }
        return false;
    }

    public async listCategory(): Promise<Category[]> {
        return await this.repository.find();
    }


    public async updateCategory(name: string, category: CategoryDto): Promise<boolean> {
        return;
    }

    public async deleteCategory(id: number): Promise<boolean> {
        const res: DeleteResult = await this.repository.delete(id);
        return (res.affected > 0) ? true : false;
    }
}