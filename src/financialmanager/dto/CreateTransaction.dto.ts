import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Almoço',
    description: 'Descrição da operação',
  })
  @IsNotEmpty()
  description: string;

  userId: string;

  @ApiProperty({
    example: '1 - Entrada, 0 - Saida',
    description: 'Se a operação a ser cadastrada é entra ou saida',
  })
  @IsNotEmpty()
  type: number;

  @ApiProperty({
    example: '10.60',
    description: 'Valor da operação, com . sendo a casa decimal',
  })
  @IsNotEmpty()
  amount: number;
}