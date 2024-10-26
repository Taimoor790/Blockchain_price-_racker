// get-hourly-prices.dto.ts
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Chain {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
}

export class GetHourlyPricesDto {
  @ApiProperty({
    description: 'Chain name (must be either ethereum or polygon)',
    enum: Chain,
    example: Chain.ETHEREUM, // Example value
  })
  @IsEnum(Chain, { message: 'Chain must be either ethereum or polygon' })
  chain: Chain;
}
