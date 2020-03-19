import { Controller, Get , Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('2DMap')
  getMap1(@Response() res){
    return res.render('2DMap')
  }

    @Get('dashboardTest')
    getDashboard(@Response() res){
        return res.render('dashboardTest')
    }

}
