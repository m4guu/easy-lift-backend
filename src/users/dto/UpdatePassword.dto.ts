import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  userId: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  newPassword: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  password: string;
}
