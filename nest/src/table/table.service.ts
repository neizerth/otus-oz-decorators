import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Table } from '../entities';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepo: Repository<Table>,
  ) {}

  findAll() {
    return this.tableRepo.find();
  }

  findOne(id: number) {
    return this.tableRepo.findOne({
      where: { id },
    });
  }
}
