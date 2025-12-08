import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuSet } from '../entities';
import { MenuSetController } from './menu-set.controller';
import { MenuSetService } from './menu-set.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuSet])],
  controllers: [MenuSetController],
  providers: [MenuSetService],
  exports: [MenuSetService],
})
export class MenuSetModule {}


