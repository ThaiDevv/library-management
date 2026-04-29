import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: loginDto) {
    const { MaNV, password } = loginDto;
    const sql = 'SELECT * FROM taikhoan t WHERE t.MaNV = ?';
    const users = await this.db.query(sql, [MaNV]);
    const user = users[0];
    if (!users || users.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const auth = await bcrypt.compare(password, user.MatKhau);
      if (auth) {
        const payload: JwtPayload = { sub: user.MaNV, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('wrong password');
      }
    }
  }
}
