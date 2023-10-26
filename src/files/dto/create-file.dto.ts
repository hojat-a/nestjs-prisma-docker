import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsOptional()
  description: string;
}
