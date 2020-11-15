import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetContactDto {
  @ApiProperty({
    example: 'ygor',
    description: 'Irei pesquisar com like %% no email e no username',
  })
  @IsNotEmpty()
  name: string
}