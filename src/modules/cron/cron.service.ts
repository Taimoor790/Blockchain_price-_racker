import { Inject, Injectable } from '@nestjs/common';
import { PriceService } from '../price/price.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { AlertService } from '../alert/alert.service';
@Injectable()
export class CronService {
    
    constructor( @Inject(PriceService) private priceService: PriceService,
    @Inject(AlertService) private alertService: AlertService
) {}

    @Cron(CronExpression.EVERY_5_MINUTES)
    handlePrice(){
        this.priceService.updatePrices()
    }

    @Cron(CronExpression.EVERY_HOUR)
    everyHour(){
        this.alertService.checkPriceAlerts()
    }
  


}
