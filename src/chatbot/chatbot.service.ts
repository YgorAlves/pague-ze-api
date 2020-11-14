import { Injectable } from '@nestjs/common';
import MessageDto from './dto/Message.dto';

@Injectable()
export class ChatbotService {

  async getMessage(message: string):Promise<MessageDto> {

    const msg = {
      message: "Não entendi muito bem, poderia repetir ?"
    }

    const obj = [
      {
        term: ["ping"],
        res: "pong"
      }, {
        term: ["ok"],
        res: "ok?"
      }, {
        term: ["pagar", ""],
        res: "Beleza! Deseja pagar com Boleto, Pix, ou QrCode?"
      }, {
        term: ["depositar", ""],
        res: "Beleza! vamos adicionar uma graninha na sua carteira com cartão de credito, débito ou boleto?"
      }, {
        term: ["ajuda","ajud", "socoro", "help", "socorro", ""],
        res: "Opa! Estou aqui para isso mesmo, você deseja Pagar ou Depositar?"
      },
    ]
    
    //parapara  para  para !! para caralho para de digitar cacete ow demonio
    //para de digitar
    //pra que? show? array de possibilidade, so cuidado pra n repetir, pq vai pegar o primeiro res que o term bater
    
    // const response = obj.find(o => message.includes(o.term))
    const response = obj.find(o => o.term.some(ea => message.includes(ea)))

    if(response)
      msg.message = response.res
    

    return msg;
  }

}
