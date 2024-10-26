// set-alert.dto.ts
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Chain } from 'src/modules/price/dto/get-hourly-prices.dto';

export class SetAlertDto {
  @ApiProperty({
    description: 'Chain name (must be either ethereum or polygon)',
    enum: Chain,
  })
  @IsEnum(Chain, { message: 'Chain must be either ethereum or polygon' })
  chain: Chain;

  @ApiProperty({
    description: 'Dollar value for the price alert',
    example: 2500,
  })
  @IsNumber({}, { message: 'Dollar value must be a number' })
  price: number;

  @ApiProperty({
    description: 'Email address to receive price alerts',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
