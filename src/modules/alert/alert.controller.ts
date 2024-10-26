import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AlertService } from './alert.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SetAlertDto } from './dto/set-alert.dto';
import { ApiResponse } from 'src/dto/response.dto';

@ApiTags('alerts') // Group the endpoints under the 'alerts' tag
@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post('set-alert')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Set a price alert for a specific cryptocurrency' }) // Summary for the endpoint
  @ApiBody({ type: SetAlertDto }) // Specify the body schema
  @UsePipes(new ValidationPipe({ transform: true })) // Enable validation for the DTO
  async setAlert(@Body() setAlertDto: SetAlertDto) {
    const { chain, price, email } = setAlertDto;
    let response= await this.alertService.setPriceAlert(chain, price, email);
    return new ApiResponse(HttpStatus.OK, response, 'Set Alert successfully');
  }
}
