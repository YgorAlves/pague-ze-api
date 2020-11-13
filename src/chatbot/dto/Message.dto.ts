import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class MessageDto {
  @ApiProperty({
    example: 'This is a test message',
    description: 'message content',
  })
  @IsNotEmpty()
  message: string;
}