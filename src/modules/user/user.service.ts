import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountNVDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { userRole } from '../auth/entities/user-role.enum';
import * as bcrypt from 'bcrypt';
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
