import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { PriceModule } from '../price/price.module';
import { AlertModule } from '../alert/alert.module';
// import { CronController } from './cron.controller';

@Module({
  // controllers: [CronController],
  providers: [CronService],
  imports:[PriceModule,AlertModule]
})
export class CronModule {}
