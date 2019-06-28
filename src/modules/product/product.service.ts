import { Injectable } from '@nestjs/common';
import { Repository, Connection, QueryRunner, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './../../entities/product.entity';
import { Files } from './../common/files/files';
import { ProductDto } from './dto/product.dto';
import { BuyDto } from './dto/buy.dto';

@Injectable()
export class ProductService {

    constructor
        (
            private readonly connection: Connection,
            @InjectRepository(Product)
            private readonly repository: Repository<Product>, 
        ) { }
        private fls = new Files();

    public async findAll(): Promise<Product[]> {
        this.repository.find()
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
            .where("product.name like :name ", { name: '%' + name + '%' })
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

    public async createProduct(product: ProductDto, fileUrlImg: string, fileUrlImgNutritrionalTable: string): Promise<boolean> {
        const res: Product = await this.repository.findOne({ name: product.name });
        const array = this.fls.prepareFile([fileUrlImg, fileUrlImgNutritrionalTable]);
        if (!res && product.cant > 0) {
            const query: QueryRunner = this.connection.createQueryRunner();
            await query.connect();
            await query.startTransaction();
            try {
                await query.query(`
                    INSERT INTO
                        Product
                    (
                        name,
                        state,
                        description,
                        price,
                        cant,
                        adictionalInformation,
                        imgProduct,
                        imgNutritionalTable,
                        category,
                        trademark
                    )
                    VALUES
                    (
                        '${product.name}',
                        'Activo',
                        '${product.description}',
                        ${product.price},
                        ${product.cant},
                        '${product.adictionalInformation}',
                        '${fileUrlImg}',
                        '${fileUrlImgNutritrionalTable}',
                        ${product.fk_category},
                        ${product.fk_trademark}
                    )
                `);
                await query.commitTransaction();
                return true;
            } catch (err) {
                await query.rollbackTransaction();
                this.fls.deleteFile(array);
                return false;
            } finally {
                await query.release();
            }
        }
        this.fls.deleteFile(array);
        return false;
    }

    public async updateProduct(name: string, product: ProductDto,fileUrlImg: string, fileUrlImgNutritrionalTable: string) {
        const path = await this.repository.createQueryBuilder("product")
            .select("product.imgProduct", "imgP")
            .addSelect("product.imgNutritionalTable", "imgNT")
            .where("product.name = :name", { name: name })
            .execute();
        if (this.fls.deleteFile( this.fls.prepareFile([path[0].imgP, path[0].imgNT]) ) && product.cant > 0) {
            const query: QueryRunner = this.connection.createQueryRunner();
            await query.connect();
            await query.startTransaction();
            try {
                await query.query(`
                    UPDATE
                        Product
                    SET
                        name='${product.name}',
                        state='Activo',
                        description='${product.description}',
                        price=${product.price},
                        cant=${product.cant},
                        adictionalInformation='${product.adictionalInformation}',
                        imgProduct='${fileUrlImg}',
                        imgNutritionalTable='${fileUrlImgNutritrionalTable}',
                        category=${product.fk_category},
                        trademark=${product.fk_trademark}
                    WHERE
                        name ='${name}'
                `);
                await query.commitTransaction();
                return true;
            } catch (err) {
                await query.rollbackTransaction();
                return false;
            } finally {
                await query.release();
            }
        }
        return false;
    }

    public async deleteProduct(id: number) {
        const path = await this.repository.createQueryBuilder("product")
            .select("product.imgProduct", "imgP")
            .addSelect("product.imgNutritionalTable", "imgNT")
            .where("product.id = :id", { id: id })
            .execute();
        if (this.fls.deleteFile( this.fls.prepareFile([path[0].imgP, path[0].imgNT]) )) {
            const res = await this.repository.delete(id);
            return (res.affected > 0);
        }
        return false;
    }

    public async buyProduct(buy: BuyDto) {
        const product:Product = await this.repository.findOne(buy.id);
        console.log(product.cant)
        if(product.cant >= buy.cant && buy.cant > 0){
            await this.repository
            .createQueryBuilder()
            .update(Product)
            .set({
                cant: (product.cant - buy.cant) 
            })
            .where("id = :id",{id: buy.id})
            .execute();
            return true;
        }
        return false; 
    }
}