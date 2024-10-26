import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cron } from '@nestjs/schedule';
import { Op } from 'sequelize';
import { Price } from '../../database/entities/price.entity';
import * as nodemailer from 'nodemailer';
import { Alert } from 'src/database/entities/alert.model';

@Injectable()
export class AlertService {
  constructor(
    @InjectModel(Price) private readonly priceModel: typeof Price,
    @InjectModel(Alert) private readonly alertModel: typeof Alert,
  ) {}

  // @Cron('0 * * * *') // Runs every hour
  async checkPriceAlerts() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const chains = ['ethereum', 'polygon'];

    for (const chain of chains) {
      // Get current price
      const currentPriceRecord = await this.priceModel.findOne({
        where: { chain },
        order: [['createdAt', 'DESC']],
      });

      // Check if there are alerts for the current chain
      const alerts = await this.alertModel.findAll({
        where: { chain },
      });

      // If current price record exists
      if (currentPriceRecord) {
        // Check each alert
        for (const alert of alerts) {
          if (currentPriceRecord.price >= alert.price) {
            await this.sendAlertEmail(
              alert.email,
              `${chain.charAt(0).toUpperCase() + chain.slice(1)} Price Alert`,
              `${chain.charAt(0).toUpperCase() + chain.slice(1)} price has reached or exceeded your alert threshold of $${alert.price}. Current price: $${currentPriceRecord.price}`
            );
          }
        }
      }
    }
  }




  async setPriceAlert(chain: string, price: number, email: string) {
    // Create a new alert entry in the database
    const alert = await this.alertModel.create({
      chain,
      price,
      email,
    });

    return { message: 'Price alert set successfully', alert };
  }

  private async sendAlertEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({ to, subject, text });
  }
}
