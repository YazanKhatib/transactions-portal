import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
// import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { UserPayloadDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id') id) {
    try {
      return this.usersService.findOne(id);
    } catch (e) {
      const statusCode = HttpStatus.BAD_REQUEST;

      throw new HttpException({ statusCode, message: e.message }, statusCode);
    }
  }

  @Post()
  async createUser(@Body() userDto: UserPayloadDto) {
    const { username, password, balances } = userDto;

    try {
      return await this.usersService.create({
        username,
        password,
        balances,
      });
    } catch (e) {
      const statusCode = HttpStatus.BAD_REQUEST;

      throw new HttpException({ statusCode, message: e.message }, statusCode);
    }
  }
}
