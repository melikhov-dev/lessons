import {SendMoneyCommand} from './send-money.command';

export const SendMoneyUseCaseSymbol = Symbol('SendMoneyUseCase');

export interface SendMoneyUseCase {
	sendMoney(command: SendMoneyCommand): Promise<boolean>;
}
