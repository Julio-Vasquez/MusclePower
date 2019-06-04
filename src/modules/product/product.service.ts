import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './../../entities/product.entity';


@Injectable()
export class ProductService {

  constructor
  ( 
    private readonly connection: Connection,
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  )
  {}

  public async findAll()
  {
    return ;
  }

  public async findByName(name: string)
  {
    return await this.repository
    .createQueryBuilder('products')
    .select("product.name","name")
    .addSelect("product.price","price")
    .where("product.name = :name ",{ name: name})
    .execute();
  }

  public async findById(id: number)
  {
    return await this.repository
    .createQueryBuilder('products')
    .select("product.name","name")
    .addSelect("product.price","price")
    .where("product.id = :id ",{ id: id})
    .execute();
  }

  public async createProduct()
  {
    return;
  }
}