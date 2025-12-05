import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { MenuSetService } from './menu-set.service';

@Controller('api/menu-sets')
export class MenuSetController {
  constructor(
    private menuSetService: MenuSetService,
  ) {}

  @Get()
  getMenuSets() {
    return this.menuSetService.findAll();
  }

  @Get(':id')
  getMenuSet(@Param('id') id: number) {
    return this.menuSetService.findOne(id);
  }
}
