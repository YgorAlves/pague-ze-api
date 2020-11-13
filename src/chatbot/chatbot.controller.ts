import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import MessageDto from './dto/Message.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(
    private chatbotService: ChatbotService
  ){}

  @Post('/messages')
  async getMessage(@Body() message: MessageDto): Promise<MessageDto> {
    return await this.chatbotService.getMessage(message.message);
  }

}
