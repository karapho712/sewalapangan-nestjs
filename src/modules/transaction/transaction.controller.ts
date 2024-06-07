import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // Transaction only created by service
  // @Post()
  // create(@Body() createTransactionDto: CreateTransactionDto) {
  //   return this.transactionService.create(createTransactionDto);
  // }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':transactionId')
  findOne(@Param('transactionId') transactionId: string) {
    return this.transactionService.findOne(transactionId);
  }

  // No update for transaction
  // @Patch(':transactionId')
  // update(
  //   @Param('transactionId') transactionId: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionService.update(transactionId, updateTransactionDto);
  // }

  // No delete for transaction
  // @Delete(':transactionId')
  // remove(@Param('transactionId') transactionId: string) {
  //   return this.transactionService.remove(transactionId);
  // }
}
