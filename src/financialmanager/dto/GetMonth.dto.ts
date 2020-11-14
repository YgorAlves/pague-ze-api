import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetMonthDto {
  @ApiProperty({
    example: '2020-04-01',
    description: 'Mês para exibição das transações',
  })
  @IsNotEmpty()
  month: Date;
}