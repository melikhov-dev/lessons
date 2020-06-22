import {Module} from '@nestjs/common';
import {SendMoneyController} from './send-money.controller';
@Module({
	controllers: [
		SendMoneyController
	]
})
export class AccountWebModule {}
