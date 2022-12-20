import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionDto } from './transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTransaction(transaction: TransactionDto, user: any) {
    return (
      await this.prismaService.transaction.create({
        data: { ...transaction, userId: user.id }
      })
    )
  }

  async getUserTransactions(user: any) {
    return (
      await this.prismaService.transaction.findMany({
        where: { userId: user.id }
      })
    )
  }

  async deleteTransaction(transactionId: number) {
    return (
      await this.prismaService.transaction.delete({
        where: { id: transactionId }
      })
    )
  }

}
