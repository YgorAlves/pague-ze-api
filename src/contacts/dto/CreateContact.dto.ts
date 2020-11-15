import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateContactDto {
  @ApiProperty({
    example: '1',
    description: 'id do usuario a ser cadastrado como contato do usuário atualmente logado',
  })
  @IsNotEmpty()
  id: string
}