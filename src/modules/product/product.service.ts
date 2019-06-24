import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './../../entities/product.entity';


@Injectable()
export class ProductService {

    constructor
        (
            @InjectRepository(Product)
            private readonly repository: Repository<Product>
        ) { }

    public async findAll(): Promise<Product[]> {
        return await this.repository
            .createQueryBuilder('product')
            .select("product.name", "name")
            .addSelect("product.description", "description")
            .addSelect("product.price", "price")
            .addSelect("product.cant", "cant")
            .addSelect("category.name", "category")
            .addSelect("trademark.name", "nameTrademark")
            .addSelect("trademark.img", "imgTrademark")
            .addSelect("product.imgProduct", "imageProduct")
            .addSelect("product.imgNutritionalTable", "imagenutritional")
            .innerJoin("product.trademark", "trademark")
            .innerJoin("product.category", "category")
            .execute()
        ;
    }

    public async findByName(name: string) {
        return await this.repository
            .createQueryBuilder('product')
            .select("product.name", "name")
            .addSelect("product.description", "description")
            .addSelect("product.price", "price")
            .addSelect("product.cant", "cant")
            .addSelect("category.name", "category")
            .addSelect("trademark.name", "nameTrademark")
            .addSelect("trademark.img", "imgTrademark")
            .addSelect("product.imgProduct", "imageProduct")
            .addSelect("product.imgNutritionalTable", "imagenutritional")
            .innerJoin("product.trademark", "trademark")
            .innerJoin("product.category", "category")
            .where("product.name like :name ", { name: '%'+ name + '%' })
            .andWhere("product.state = 'Activo' ")
            .execute()
        ;
    }

    public async findById(id: number) {
        return await this.repository
            .createQueryBuilder('products')
            .select("product.name", "name")
            .addSelect("product.price", "price")
            .where("product.id = :id ", { id: id })
            .execute()
            ;
    }

    public async createProduct() {
        return;
    }

    public async updateProduct() {
        return;
    }

    public async deleteProduct() {
        return;
    }

    public async buyProduct(id: number) {
        return;
    }
}