import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
  @ApiProperty({
    example: 'DIGITAL',
    description: 'Tipo da conta, PIX, Carteira Digital, por enquando sempre enviar DIGITAL',
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'cartera digital',
    description: 'Nome da conta, a escolha do usuario, apenas exibição',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '0.00',
    description: 'Saldo inicial',
  })
  @IsNotEmpty()
  balance: number;

}