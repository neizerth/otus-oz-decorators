import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from '../entities';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}


