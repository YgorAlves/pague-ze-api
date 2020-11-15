import { IsNotEmpty } from "class-validator";

export class CreateContactDto {
  @IsNotEmpty()
  id: string
}