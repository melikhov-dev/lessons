import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AccountOrmEntity} from './account.orm-entity';
import {ActivityOrmEntity} from './activity.orm-entity';
import {AccountPersistenceAdapterService} from './account-persistence-adapter.service';
import {SendMoneyUseCaseSymbol} from '../../domains/ports/in/send-money.use-case';
import {SendMoneyService} from '../../domains/services/send-money.service';

@Global()
@Module({
	imports: [
		TypeOrmModule.forFeature([AccountOrmEntity, ActivityOrmEntity])
	],
	providers: [
		AccountPersistenceAdapterService,
		{
			provide: SendMoneyUseCaseSymbol,
			useFactory: (accountPersistenceAdapterService: AccountPersistenceAdapterService) => {
				return new SendMoneyService(accountPersistenceAdapterService, accountPersistenceAdapterService);
			},
			inject: [AccountPersistenceAdapterService]
		}
	],
	exports: [
		SendMoneyUseCaseSymbol
	]
})
export class AccountPersistenceModule {}
