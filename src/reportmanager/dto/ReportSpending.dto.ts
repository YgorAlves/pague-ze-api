import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ReportSpendingDto {

  @ApiProperty({
    example: '2020-11-14',
    description: 'Data caso queira o relatório do mês, tipo Date(ISO_8601)',
  })
  month: Date;

}