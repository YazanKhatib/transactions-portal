import {
  Body,
  Headers,
  Controller,
  Get,
  HttpException,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionPayloadDto } from './transactions.dto';
import * as jwt from 'jsonwebtoken';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  getUsers() {
    return this.transactionsService.findAll();
  }

  @Post()
  async createTransaction(
    @Body() createTransactionDto: TransactionPayloadDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const { type, coin, amount, address } = createTransactionDto;

    console.log(authHeader);
    const token = authHeader.split(' ')[1];

    // Decode the token
    const decodedToken = jwt.decode(token) as {
      username: string;
    };

    try {
      return await this.transactionsService.create({
        type,
        coin,
        amount,
        address,
        username: decodedToken?.username,
      });
    } catch (e) {
      const statusCode = HttpStatus.BAD_REQUEST;

      throw new HttpException({ statusCode, message: e.message }, statusCode);
    }
  }
}
