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
        term: ["pagar"],
        res: "Beleza! Deseja pagar com Boleto, Pix, ou QrCode?"
      }, {
        term: ["depositar"],
        res: "Beleza! vamos adicionar uma graninha na sua carteira com cartão de credito, débito ou boleto?"
      }, {
        term: ["ajuda","ajud", "socoro", "help", "socorro", "ola", "oi","olá","ei"],
        res: "Opa! Estou aqui para isso mesmo, você deseja Pagar ou Depositar?"
      },
      {
        term: ["seu nome","chamo", "quem é", "você", "quem"],
        res: "Opa! eu sou o Zé. Estou pronto para te ajudar, oque deseja? Pagar ou Depositar?"
      },
      {
        term: ["boleto", "credito", "debito"],
        res: "Qual valor você quer depositar?"
      },
      {
        term: ["reais","dinheiro","$"],
        res: "Boleto gerado \n 34191.79001 01043.510047 91020.150008 5 84390026000"
      },
      {
        term: ["obrigado","obg","thau", "fim"],
        res: "Opa, por nada, foi um prazer, volte quando precisar. Obrigado!"
      }

    ]
    
    const response = obj.find(o => o.term.some(ea => (message.toLowerCase()).includes(ea)))

    if(response)
      msg.message = response.res
    

    return msg;
  }

}
