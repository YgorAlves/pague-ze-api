import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private mercadoService: MercadopagoService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return await this.mercadoService.test()
  }
  
}
