import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { MenuSet } from '../entities';

@Injectable()
export class MenuSetService {
  constructor(
    @InjectRepository(MenuSet)
    private menuSetRepo: Repository<MenuSet>,
  ) {}

  findAll() {
    return this.menuSetRepo.find({
      relations: ['dishes'],
    });
  }

  findOne(id: number) {
    return this.menuSetRepo.findOne({
      where: { id },
      relations: ['dishes'],
    });
  }
}
