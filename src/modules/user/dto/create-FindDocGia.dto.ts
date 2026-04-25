import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateFindDocGiaDto {
  @IsOptional()
  @IsString()
  HoTen!: string;

  @IsOptional()
  @IsDateString()
  TuNgay!: string;

  @IsOptional()
  @IsDateString()
  DenNgay!: string;
}