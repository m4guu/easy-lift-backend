import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateEmailDto {
  @IsString()
  userId: string;

  @IsEmail()
  newEmail: string;

  @MinLength(5)
  @MaxLength(15)
  password: string;
}
