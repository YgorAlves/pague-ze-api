import { IsNotEmpty } from "class-validator";

export default class MessageDto {
  @IsNotEmpty()
  message: string;
}