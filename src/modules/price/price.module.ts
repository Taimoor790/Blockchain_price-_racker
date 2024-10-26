import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriceService } from './price.service';
import { Price } from 'src/database/entities/price.entity'; // Adjust the import path as needed

@Module({
  imports: [
    SequelizeModule.forFeature([Price]), // Add Price model to SequelizeModule
  ],
  controllers: [PriceController],
  providers: [PriceService],
  exports: [PriceService], // Export PriceService if needed in other modules
})
export class PriceModule {}
