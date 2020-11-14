import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class IdDto {
  @ApiProperty({
    example: '7',
    description: 'Id para deleção de uma transação',
  })
  @IsNotEmpty()
  id: string;
}