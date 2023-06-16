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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('loginWithToken')
  async loginWithToken(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }
    try {
      const user = await this.authService.validateUserByToken(token);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      return res.json({ user });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { user, token } = await this.authService.login(req.user);
    // sending the access token as a http only cookie & return user after successful login
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 36000000),
      })
      .send({ user });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
