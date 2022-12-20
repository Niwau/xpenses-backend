export class TransactionDto {
  category: string
  name: string
  value: number
  type: 'EXPENSE' | 'INCOME'
}