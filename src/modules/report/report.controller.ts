import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { ThongKeSachDto } from './dto/ThongKe.dto';
import { ThongKeSachDangMuonDto } from './dto/ThongKeMuon.dto';
import { ThongKePhieuMuonDto } from './dto/ThongKePhieuMuonTheoThoiGian.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  ThongKeSach(@Query() thongKeSachDto:ThongKeSachDto){
    return this.reportService.ThongKeSachTheoTheLoai(thongKeSachDto)
  }
  @Get('SachDangMuon')
  ThongKeSachDangDuocMuon(@Query() thongkesachdangduocmuonDto:ThongKeSachDangMuonDto){
    return this.reportService.ThongKeSachDangDuocMuon(thongkesachdangduocmuonDto);
  }
  @Get('PhieuMuon')
  ThongKePhieuMuonTheoThoiGian(@Query() thongphieumuontheothoigianDto:ThongKePhieuMuonDto){
    return this.reportService.ThongKePhieuMuonTheoThoiGian(thongphieumuontheothoigianDto)
  }
}
