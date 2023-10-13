import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
    Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
		return this.transactionService.create(
			createTransactionDto,
			+req.user.id
		);
	}

	//url/transaction/pagination?page=1&limit=3
	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagiantion(
		@Req() req,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 3
	) {
		return this.transactionService.findAllWithPagiantion(
			req.user.id,
			+page,
			+limit
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(@Req() req) {
		return this.transactionService.findAll(req.user.id);
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.transactionService.findOne(+id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	update(
		@Param('id') id: string,
		@Body() updateTransactionDto: UpdateTransactionDto
	) {
		return this.transactionService.update(+id, updateTransactionDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.transactionService.remove(+id);
	}
}
