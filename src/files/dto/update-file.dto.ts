import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { ValidateIf } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @ValidateIf((input) => !input.description || input.title)
  title: string;

  @ValidateIf((input) => !input.title || input.description)
  description: string;
}
