import {SendMoneyCommand} from './send-money.command';

export interface SendMoneyUseCase {
	sendMoney(command: SendMoneyCommand);
}
