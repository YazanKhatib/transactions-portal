import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  getUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('users/:id')
  getUser(@Body() username: string) {
    return this.usersService.findOne(username);
  }
}
