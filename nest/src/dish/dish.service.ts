import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Dish } from '../entities';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private dishRepo: Repository<Dish>,
  ) {}

  findAll() {
    return this.dishRepo.find();
  }

  findOne(id: number) {
    return this.dishRepo.findOne({
      where: { id },
    });
  }
}
