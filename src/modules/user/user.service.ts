import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountNVDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { userRole } from '../auth/entities/user-role.enum';
import * as bcrypt from 'bcrypt';
import { CreateDocGiaDto } from './dto/create-DocGia.dto';
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
        message: 'Thêm Tai khoan thành công!',
      };
    } catch (error) {
      throw new BadRequestException(`Lỗi từ Database: ${error.message}`);
    }
  }

  async CreateDocGia(createDocGiaDto: CreateDocGiaDto) {
    try {
      const { MaDocGia, HoTen, NgaySinh, DiaChi, SDT } = createDocGiaDto;
      const sql = 'CALL ThemDocGia(?,?,?,?,?)'; //
      const params = [MaDocGia, HoTen, NgaySinh, DiaChi, SDT];
      const result = await this.db.query(sql, params);
      return {
        success: true,
        message: 'Thêm độc giả thành công!',
      };
    } catch (error) {
      throw new Error(`Lỗi khi Thêm độc giả: ${error.message}`);
    }
  }
  async UpdateDocGia(createUpdateDocGiaDto: CreateDocGiaDto) {
    try {
      const { MaDocGia, HoTen, NgaySinh, DiaChi, SDT } = createUpdateDocGiaDto;
      const sql = 'CALL CapNhatDocGia(?,?,?,?,?)';
      const params = [
        MaDocGia,
        HoTen ?? null,
        NgaySinh ?? null,
        DiaChi ?? null,
        SDT ?? null,
      ];
      const result = await this.db.query(sql, params);
      return {
        success: true,
        message: 'Cập nhật độc giả thành công!',
      };
    } catch (error) {
      throw new Error(`Lỗi khi Cập nhật độc giả: ${error.message}`);
    }
  }
  async DeleteDocGia(id: string) {
    try {
      const sql =
        "Update docgia SET TrangThai = 'Đã Xóa Độc Giả' where MaDocGia=?";
      const params = [id];
      const result = await this.db.query(sql, params);
      return {
        success: true,
        message: 'Xóa độc giả thành công!',
      };
    } catch (error) {
      throw new Error(`Lỗi khi Xóa độc giả: ${error.message}`);
    }
  }
  async FindDocGia(tukhoa) {
    try {
      const sql = 'CALL sp_TimKiemDocGia(?)';
      const result = await this.db.query(sql, [tukhoa]);
      return result;
    } catch (error) {
      throw new Error(`Lỗi khi Tìm kiếm độc giả: ${error.message}`);
    }
  }
  async findOneDocGia(id: string) {
    try {
      const sql = 'SELECT * FROM docgia WHERE MaDocGia = ?';
      const result = await this.db.query(sql, [id]);
      return result[0] ?? null;
    } catch (error) {
      throw new Error(`Lỗi khi Tìm kiếm độc giả: ${error.message}`);
    }
  }
  async unlockDocGia(id: string) {
    try {
      const sql =
        "UPDATE docgia SET TrangThai = 'Hoạt Động' WHERE MaDocGia = ?";
      const result = await this.db.query(sql, [id]);
      return {
        success: true,
        message: 'unlock độc giả thành công!',
      };
    } catch (error) {
      throw new Error(`Lỗi khi unlock độc giả: ${error.message}`);
    }
  }
  async CreateNewNhanVien(createNewNhanVienDto: CreateNewNhanVienDto) {
    const { MaNV, HoTen, DienThoai } = createNewNhanVienDto;
    const sql = 'CALL ThemNhanVien(?,?,?)';
    const params = [MaNV, HoTen, DienThoai];
    const result = await this.db.query(sql, params);
    return result;
  }
  async UpdateNhanVien(updateNhanVienDto: CreateNewNhanVienDto) {
    const { MaNV, HoTen, DienThoai } = updateNhanVienDto;
    const sql = 'CALL CapNhatNhanVien(?,?,?)';
    const params = [MaNV, HoTen ?? null, DienThoai ?? null];
    const result = await this.db.query(sql, params);
    return result;
  }
  async DeleteNhanVien(id: string) {
    const sql = 'DELETE from nhanvien where MaNV=?';
    const params = [id];
    const result = await this.db.query(sql, params);
    return result;
  }
  async ViewNhanVien(viewNhanVienDto: CreateNewNhanVienDto) {
    const { MaNV, HoTen, DienThoai } = viewNhanVienDto;
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
    const result = await this.db.query(sql, params);
    return result;
  }
}
