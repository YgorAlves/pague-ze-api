import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReportmanagerService } from './reportmanager.service';
import { ReportSpendingDto } from './dto/ReportSpending.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/models/user.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('Report Manager')
@Controller('reportmanager')
export class ReportmanagerController {
    constructor(private reportmanagerService: ReportmanagerService) {}

    @Get('spending')
    async spending(@Body() reportspendingDto: ReportSpendingDto, @CurrentUser() user: User): Promise<any> {
        return await this.reportmanagerService.spending(reportspendingDto, user)
    }
}
