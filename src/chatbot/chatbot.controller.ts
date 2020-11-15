import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatbotService } from './chatbot.service';
import MessageDto from './dto/Message.dto';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(
    private chatbotService: ChatbotService
  ){}

  @ApiOperation({ summary: 'Send Message to this route :D' })
  @UseGuards(JwtAuthGuard)
  @Post('/messages')
  async getMessage(@Body() message: MessageDto): Promise<MessageDto> {
    return await this.chatbotService.getMessage(message.message);
  }

}
