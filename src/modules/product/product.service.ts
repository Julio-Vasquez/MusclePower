import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Product } from './../../entities/product.entity';
import { productDto } from './dto/product.dto';

@Injectable()
export class productService {

  constructor
  ( 
    private readonly connection: Connection,
   @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ){}

  public async findAll(): Promise<Product[]>
  {
    return await this.repository.find();
  }

  public async findByName(name: string): Promise<Product[]>
  {
    return await this.repository
    .createQueryBuilder('products')
    .select("product.name","name")
    .addSelect("product.price","price")
    .where("product.name = :name ",{ name: name})
    .execute();
  }

  public async findById(id: number):Promise<Product>
  {
    return await this.repository
    .createQueryBuilder('products')
    .select("product.name","name")
    .addSelect("product.price","price")
    .where("product.id = :id ",{ id: id})
    .execute();
  }

  public async createProduct(productDto: productDto)
  {
    return;
  }
}