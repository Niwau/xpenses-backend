import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './transaction.dto';
import { Request } from 'express';

@Controller('transactions')
export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService){}

  @Post()
  createTransaction(@Body() transaction: TransactionDto, @Req() req: Request){
    return this.transactionsService.createTransaction(transaction, req.user);
  }

  @Get()
  getTransactions(@Req() req: Request) {
    return this.transactionsService.getUserTransactions(req.user)
  }

  @Delete(':id')
  deleteTransaction(@Param('id', ParseIntPipe) id: number){
    return this.transactionsService.deleteTransaction(id)
  }

}
