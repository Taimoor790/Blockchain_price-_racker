import { Controller, Get, HttpCode, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PriceService } from './price.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ApiResponse } from 'src/dto/response.dto';
import { Chain, GetHourlyPricesDto } from './dto/get-hourly-prices.dto';

@ApiTags('prices') // This will group all routes under the 'prices' tag in Swagger UI
@Controller('prices')
export class PriceController {
  constructor(private priceService: PriceService) {}

  @Get('hourly')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get hourly prices for a specific chain' })
  @ApiQuery({ name: 'chain', required: true, enum: Chain, description: 'Chain name (e.g., ethereum, polygon)' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getHourlyPrices(@Query() query: GetHourlyPricesDto): Promise<ApiResponse<any[]>> {
    const prices = await this.priceService.getHourlyPrices(query.chain);
    return new ApiResponse(HttpStatus.OK, prices, 'Hourly prices retrieved successfully');
  }

  @Get('swap-rate')
  @ApiOperation({ summary: 'Get swap rate for Ethereum' })
  @ApiQuery({ name: 'ethAmount', required: true, type: Number, description: 'Amount of Ethereum to swap' })
  async getSwapRate(@Query('ethAmount') ethAmount: number) {
    let response= await this.priceService.getSwapRate(ethAmount);
    return new ApiResponse(HttpStatus.OK, response, 'successfully');
  }
}
