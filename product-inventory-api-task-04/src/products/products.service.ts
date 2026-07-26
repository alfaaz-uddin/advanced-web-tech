import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const newProduct = this.productsRepo.create(dto);
    const savedProduct = await this.productsRepo.save(newProduct);
    return { message: 'Product created successfully', data: savedProduct };
  }

  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });
    return { message: 'All products fetched', count: products.length, data: products };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return { message: 'Product fetched', data: product };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    
    await this.productsRepo.update(id, dto);
    const updatedProduct = await this.productsRepo.findOne({ where: { id } });
    return { message: 'Product updated partially', data: updatedProduct };
  }

  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);

    // Fully replace by mapping the DTO fields and saving
    const replacedProduct = await this.productsRepo.save({ ...product, ...dto });
    return { message: 'Product replaced fully', data: replacedProduct };
  }

  async remove(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    
    await this.productsRepo.delete(id);
    return { message: 'Product deleted', id };
  }

  async findByCategory(category: string) {
    const products = await this.productsRepo.find({ where: { category } });
    return { message: `Products in category ${category}`, count: products.length, data: products };
  }

  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
    });
    return { message: `Search results for ${keyword}`, count: products.length, data: products };
  }

  async toggleActive(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);

    product.isActive = !product.isActive;
    const savedProduct = await this.productsRepo.save(product);
    return { message: 'Product active status toggled', data: savedProduct };
  }
}