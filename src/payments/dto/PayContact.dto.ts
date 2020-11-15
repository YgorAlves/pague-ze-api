import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PayContactDto {
  @ApiProperty({
    example: '6',
    description: 'ID Do usuário que receberá o pagamento',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    example: '15.50',
    description: 'Valor que voce vai pagar',
  })
  @IsNotEmpty()
  amount: number

  @ApiProperty({
    example: 'p2p',
    description: 'Qual a forma de pagamento voce vai utilizar, por enquanto utilizar apenas p2p',
  })
  @IsNotEmpty()
  type: 'p2p' | 'pix' | 'qrcode'

}