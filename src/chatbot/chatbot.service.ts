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
        term: "ping",
        res: "pong"
      }, {
        term: "ok",
        res: "ok?"
      }
    ]

    const response = obj.find(o => message.includes(o.term))

    if(response)
      msg.message = response.res
    

    return msg;
  }

}
