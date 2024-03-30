import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './models/users.schema';
import { Response } from 'express';
import { AuthService } from '../auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    const login = await this.authService.login(user, response);

    response.send(user);
  }
}
