import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailerModule } from '@nestjs-modules/mailer';
import { Price } from 'src/database/entities/price.entity';
import { Alert } from 'src/database/entities/alert.model'; // Adjust the import path as needed

@Module({
  imports: [
    SequelizeModule.forFeature([Price, Alert]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com', // Replace with actual SMTP host
        port: 587,
        secure: false,
        auth: {
          user: 'user@example.com', // Replace with actual email
          pass: 'password', // Replace with actual password
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  providers: [AlertService],
  controllers: [AlertController],
  exports: [AlertService],
})
export class AlertModule {}
