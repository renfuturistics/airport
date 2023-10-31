import {
  Controller,
  Request,
  Post,
  UseGuards,
  Req,
  Get,
  Res,
  Param,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response, Request as ExpressRequest } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;

    return this.authService.login(user, res);
  }
  @Post('register')
  async register(@Body() body: any) {
    return await this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') password: string,
  ) {
    return this.authService.resetPassword(token, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req.user, res);
  }

  @Get('refresh')
  refreshTokens(
    @Req() req: ExpressRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshTokens(req, res);
  }
}
