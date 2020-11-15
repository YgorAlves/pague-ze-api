import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DepositWalletDto {


  // @IsNotEmpty('')
  // recipientAux: string;

  // @IsNotEmpty()
  // type: 'purchase' | 'sell' | 'transfer' | 'loterica' | 'p2p' | 'deposit';

  // @IsNotEmpty()
  // description: string;

  @IsNotEmpty()
  amount: number;

}