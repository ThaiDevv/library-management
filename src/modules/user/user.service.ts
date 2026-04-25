import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountNVDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { userRole } from '../auth/entities/user-role.enum';
import * as bcrypt from 'bcrypt';
import { CreateDocGiaDto } from './dto/create-DocGia.dto';
import { CreateFindDocGiaDto } from './dto/create-FindDocGia.dto';
import { ViewDocGiaDto } from './dto/create-ViewDocGia.dto';
import { CreateNewNhanVienDto } from './dto/create-NhanVien.Dto';
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}
  async createAccountNV(createUserDto: CreateAccountNVDto) {
    try {
      const { MaNV, password } = createUserDto;
      const sql = 'INSERT INTO taikhoan (MatKhau, MaNV, role) VALUES (?, ?, ?)';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const salt = await bcrypt.genSalt();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const hashPassword = await bcrypt.hash(password, salt);
      const params = [hashPassword, MaNV, userRole.NHANVIEN];
      const result = await this.db.query(sql, params);
      return {
        success: true,
        message: 'Thêm thể loại thành công!',
      };
    } catch (error) {
      throw new BadRequestException(`Lỗi từ Database: ${error.message}`);
    }
  }

  async CreateDocGia(createDocGiaDto: CreateDocGiaDto){
    const{MaDocGia,HoTen,NgaySinh,DiaChi,SDT} = createDocGiaDto
    const sql = 'CALL ThemDocGia(?,?,?,?,?)';//
    const params = [MaDocGia,HoTen,NgaySinh,DiaChi,SDT]
    const result = await this.db.query(sql,params)
    return result
  }
  async UpdateDocGia(createUpdateDocGiaDto:CreateDocGiaDto){
    const{MaDocGia,HoTen,NgaySinh,DiaChi,SDT} = createUpdateDocGiaDto
    const sql = 'CALL CapNhatDocGia(?,?,?,?,?)';
    const params =[MaDocGia,
                   HoTen??null,
                   NgaySinh??null,
                   DiaChi??null,
                   SDT??null]
    const result = await this.db.query(sql,params)
    return result
  }
  async DeleteDocGia(id: string){
    const sql="Update docgia SET TrangThai = 'DaXoaDocGia' where MaDocGia=?";  
    const params=[id];
    const result=await this.db.query(sql,params)
    return result
  }
  async FindDocGia(createFindDocGiaDto:CreateFindDocGiaDto){
    const{HoTen,TuNgay,DenNgay} = createFindDocGiaDto
    const sql='CALL TimDocGia(?,?,?)';
    const params =[HoTen??null,
                   TuNgay??null,
                   DenNgay??null]
    const result=await this.db.query(sql,params)
    return result
  }
  async ViewDocGia(viewDocGiaDto:ViewDocGiaDto){
    const{HoTen}=viewDocGiaDto;
    const sql='CALL TimDocGia(?)';
    const params=[HoTen??null];

    const result=await this.db.query(sql,params)
    return result
  } 
  async CreateNewNhanVien(createNewNhanVienDto:CreateNewNhanVienDto){
    const{MaNV,HoTen,DienThoai}=createNewNhanVienDto;
    const sql='CALL ThemNhanVien(?,?,?)';
    const params=[MaNV,HoTen,DienThoai];
    const result=await this.db.query(sql,params)
    return result
  }
  async UpdateNhanVien(updateNhanVienDto:CreateNewNhanVienDto){
    const{MaNV,HoTen,DienThoai}=updateNhanVienDto;
    const sql='CALL CapNhatNhanVien(?,?,?)';
    const params=[MaNV,HoTen??null,DienThoai??null];
    const result = await this.db.query(sql,params)
    return result
  } 
  async DeleteNhanVien(id:string){
    const sql='DELETE from nhanvien where MaNV=?';
    const params=[id];
    const result=await this.db.query(sql,params)
    return result
  }
  async ViewNhanVien(viewNhanVienDto:CreateNewNhanVienDto){
    const{MaNV,HoTen,DienThoai}=viewNhanVienDto;
    let sql = 'SELECT * FROM nhanvien WHERE 1=1';
    const params: any[] = [];

    if (MaNV) {
    sql += ' AND MaNV = ?';
    params.push(MaNV);
  }

    if (HoTen) {
    sql += ' AND HoTen LIKE ?';
    params.push(`%${HoTen}%`);
  }

    if (DienThoai) {
    sql += ' AND DienThoai = ?';
    params.push(DienThoai);
  }
  const result=await this.db.query(sql,params)
  return result
  }
}
