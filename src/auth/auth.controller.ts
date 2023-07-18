import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { CreateUserDto } from './dto/CreateUserDto';
import { AppHttpException } from '../libs/errors';
import { CookieKeys } from '../common/enums';

import { tokenCookieOptions } from './constans';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('loginWithToken')
  async loginWithToken(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.authService.validateUserByToken(
        req.cookies.token,
      );
      return res.json({ user });
    } catch (error) {
      throw new AppHttpException(error);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { user, token } = this.authService.login(req.user);
    // sending the access token as a http only cookie & return user after successful login
    res.cookie(CookieKeys.TOKEN, token, tokenCookieOptions).send({ user });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(CookieKeys.TOKEN);
    res.status(200).json({ message: 'Logged out successfully.' });
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new AppHttpException(error);
    }
  }
}
