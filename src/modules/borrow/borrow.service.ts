import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { creatBorrowDto } from './dto/creatBorrow.dto';
import { updateBorrowDto } from './dto/updateDealine.dto';

@Injectable()
export class BorrowService {
  constructor(private readonly db: DatabaseService) {}
  async creatBorrow(CreatborrowDto: creatBorrowDto) {
    try {
      const { MaDocGia, MaNV, NgayTraDuKien, DanhSach } = CreatborrowDto;
      const sql = 'CALL ThucHienMuonNhieuSach(?,?,?,?)';
      const params = [MaDocGia, MaNV, NgayTraDuKien, DanhSach];
      const result = await this.db.query(sql, params);
      return {
        success: true,
        message: 'Thêm Phieu Muon thành công!',
      };
    } catch (error) {
      throw new Error(`Lỗi khi thêm PHieu Muon: ${error.message}`);
    }
  }
  async updateDeadline(updateBorrowDto: updateBorrowDto) {
    try {
      const { MaPM, SoNgayThem } = updateBorrowDto;
      const sql = 'CALL GiaHanSach(?,?)';
      const params = [MaPM, SoNgayThem];
      const result = await this.db.query(sql, params);
      return {
        success: true,
        message: 'cap nhat Phieu Muon thành công!',
      };
    } catch (error) {
      throw new Error(`Lỗi khi cap nhat PHieu Muon: ${error.message}`);
    }
  }
  async deleteBorrow(MaPM: string) {
    try {
      const sql = 'DELETE FROM phieumuon WHERE phieumuon.MaPM = ?';
      const params = [MaPM];
      const result = await this.db.query(sql, params);
      return {
        success: true,
        message: 'xoa Phieu Muon thành công!',
      };
    } catch (error) {
      throw new Error(`Lỗi khi xoa PHieu Muon: ${error.message}`);
    }
  }
  async findAll() {
    try {
      const sql = 'SELECT * FROM v_phieumuonchitiet';
      const result = await this.db.query(sql);
      return result;
    } catch (error) {
      throw new Error(`Lỗi khi Lay PHieu Muon: ${error.message}`);
    }
  }
  // async addBook()
}
