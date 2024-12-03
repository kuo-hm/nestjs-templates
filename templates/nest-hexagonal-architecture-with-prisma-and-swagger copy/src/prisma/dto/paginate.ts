import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { validateIntValue } from '../../common/helpers';

export class PaginationArgs {
  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  @Transform(({ value }) => validateIntValue(value))
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ required: false, default: '' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, default: 10 })
  @IsNumber()
  @Transform(({ value }) => validateIntValue(value))
  @IsOptional()
  perPage?: number;

  @ApiProperty({ required: false, default: 'id' })
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ required: false, default: 'asc', enum: ['asc', 'desc'] })
  @IsString()
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResponse {
  items: Array<any>;

  meta: IMeta;
}

export interface IMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
