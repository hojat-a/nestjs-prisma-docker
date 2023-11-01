import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional } from 'class-validator';

export class GetAllFilesQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize?: number;
}
