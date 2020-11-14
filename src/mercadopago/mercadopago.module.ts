import { Module } from '@nestjs/common';
import { MercadopagoController } from './mercadopago.controller';
import { MercadopagoService } from './mercadopago.service';
import * as mercadopago from 'mercadopago'

@Module({
  controllers: [MercadopagoController],
  providers: [MercadopagoService,{
    provide: 'MERCADOPAGO',
    useFactory: async () => {

      mercadopago.configure({
        access_token: 'TEST-3728515336067325-111321-9ea0e85c6fe93b7574fcd288762ce52a-271547972'
      })

      let preference = {
        items: [
          {
            title: 'Test',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 10.5
          }
        ]
      };

      const res = await mercadopago.preferences.create(preference)

      return res;
    }
  }],
  exports:[MercadopagoService]
})
export class MercadopagoModule {}
