import {AccountId} from '../../entities/account.entity';

export interface GetAccountBalanceQuery {
	getAccoutBalance(accountId: AccountId);
}
