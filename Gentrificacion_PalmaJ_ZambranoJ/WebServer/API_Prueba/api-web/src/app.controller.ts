import { Controller, Get , Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('home')
  getHome(@Response() res){
    return res.render('home')
  }

  @Get('dashboardMap')
  getDashboard(@Response() res){
        return res.render('dashboardMap')
  }

  @Get('dashboardNew')
  getDashboard1(@Response() res){
    return res.render('dashboardNew')
  }

  @Get('report')
  getReport(@Response() res){
        return res.render('report')
  }

  @Get('help')
  getHelp(@Response() res){
    return res.render('help')
  }

}
