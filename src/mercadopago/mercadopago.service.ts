import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MercadopagoService {
  constructor(
    @Inject('MERCADOPAGO') private mercadopago
  ) { }

  async test() {

    console.log(this.mercadopago)
    
    console.log(this.mercadopago)
    
    return true
  }
}
