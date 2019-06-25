import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './../../entities/product.entity';
import { Files } from './../common/files/files';
import { ProductDto } from './dto/product.dto';


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

    public async updateProduct(name:string, product:ProductDto) {
        const path = await this.repository.createQueryBuilder("product")
        .select("product.imgProduct","imgP")
        .addSelect("product.imgNutritionalTable","imgNT")
        .where("product.name = :name",{ name: name})
        .execute();
        const file = new Files();
        const array = file.prepareFile([path[0].imgP, path[0].imgNT]);
        if(file.deleteFile(array[0]) && file.deleteFile(array[1])){
            //logi update
            return ;
        }
        return false;
    }

    public async deleteProduct(id:number) {
        const path = await this.repository.createQueryBuilder("product")
        .select("product.imgProduct","imgP")
        .addSelect("product.imgNutritionalTable","imgNT")
        .where("product.id = :id",{ id: id})
        .execute();
        const file = new Files();
        const array = file.prepareFile([path[0].imgP, path[0].imgNT]);
        if(file.deleteFile(array[0]) && file.deleteFile(array[1])){
            const res = await this.repository.delete(id);
            return (res.affected>0);
        }
        return false;
    }

    public async buyProduct(id: number) {
        return;
    }
}