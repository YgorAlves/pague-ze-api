import { Controller, Get } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private mercadoService: MercadopagoService) { }

  @Get()
  async test() {
    return await this.mercadoService.test()
  }
  
}
