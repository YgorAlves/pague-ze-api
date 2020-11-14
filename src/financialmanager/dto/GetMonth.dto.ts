import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

class Filters {
  type?: string;
  local?: string;
}
export class GetMonthDto {
  @ApiProperty({
    example: '2020-04-01',
    description: 'Mês para exibição das transações',
  })
  @IsNotEmpty()
  month: Date;

  @ApiProperty({
    example: '{ type: 1 } ou { type: "" }',
    description: 'Filtro para financialmanager',
  })
  // @IsNotEmpty()
  filters: Filters

}


// pronto