import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { TableService } from './table.service';

@Controller('api/tables')
export class TableController {
  constructor(
    private tableService: TableService,
  ) {}

  @Get()
  getTables() {
    return this.tableService.findAll();
  }

  @Get(':id')
  getTable(@Param('id') id: number) {
    return this.tableService.findOne(id);
  }
}
