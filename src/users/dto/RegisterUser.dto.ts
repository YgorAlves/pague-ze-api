import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    example: 'Ygor',
    description: 'Nome da pessoa',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'teste@mercadolivre.com.br',
    description: 'Descrição da operação',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'suasenhasecreta',
    description: 'Senha da conta',
  })
  @IsNotEmpty()
  password: string;

}