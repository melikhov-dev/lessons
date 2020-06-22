import {AccountEntity, AccountId} from '../../entities/account.entity';

export interface LoadAccountPort {
	loadAccount(accountId: AccountId): Promise<AccountEntity>;
}
