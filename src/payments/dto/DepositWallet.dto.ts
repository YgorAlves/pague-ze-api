import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DepositWalletDto {


  // @IsNotEmpty('')
  // recipientAux: string;

  // @IsNotEmpty()
  // type: 'purchase' | 'sell' | 'transfer' | 'loterica' | 'p2p' | 'deposit';

  // @IsNotEmpty()
  // description: string;
  @ApiProperty({
    example: '12.50',
    description: 'Valor a ser depositado',
  })
  @IsNotEmpty()
  amount: number;

}