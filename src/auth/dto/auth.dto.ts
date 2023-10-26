import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(50)
  password: string;
}
