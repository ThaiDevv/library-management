import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewNhanVienDto {
  @IsNotEmpty()
  @IsString()
  MaNV!: string;

  @IsNotEmpty()
  @IsString()
  HoTen!: string;

  @IsNotEmpty()
  @IsString()
  DienThoai!: string;
}
