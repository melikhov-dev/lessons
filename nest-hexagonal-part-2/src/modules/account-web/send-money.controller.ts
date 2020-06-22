import {Controller, Get, Inject, Query} from '@nestjs/common';
import {SendMoneyCommand} from '../../domains/ports/in/send-money.command';
import {SendMoneyUseCase, SendMoneyUseCaseSymbol} from '../../domains/ports/in/send-money.use-case';
import {MoneyEntity} from '../../domains/entities/money.entity';

@Controller('/account/send')
export class SendMoneyController {
	constructor(
		@Inject(SendMoneyUseCaseSymbol) private readonly  _sendMoneyService: SendMoneyUseCase
	) {}
	@Get('/')
	async sendMoney(
		@Query('sourceAccountId') sourceAccountId: string,
		@Query('targetAccountId') targetAccountId: string,
		@Query('amount') amount: number
	){
		const sendMoneyCommand = new SendMoneyCommand(
			sourceAccountId,
			targetAccountId,
			MoneyEntity.of(amount)
		);
		const result = await this._sendMoneyService.sendMoney(sendMoneyCommand);
		return {result};
	}
}
