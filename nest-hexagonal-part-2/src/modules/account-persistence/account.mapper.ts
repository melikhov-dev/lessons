import {AccountOrmEntity} from './account.orm-entity';
import {ActivityOrmEntity} from './activity.orm-entity';
import {MoneyEntity} from '../../domains/entities/money.entity';
import {AccountEntity} from '../../domains/entities/account.entity';
import {ActivityWindowEntity} from '../../domains/entities/activity-window.entity';
import {ActivityEntity} from '../../domains/entities/activity.entity';

export class AccountMapper {
	static mapToDomain(
		account: AccountOrmEntity,
		activities: ActivityOrmEntity[],
	): AccountEntity {
		const activityWindowEntity = this.mapToActivityWindow(activities);
		const baselineBalance = activityWindowEntity.calculateBalance(account.userId);
		return new AccountEntity(
			account.userId,
			baselineBalance,
			this.mapToActivityWindow(activities)
		)
	}

	static mapToActivityWindow(activities: ActivityOrmEntity[]): ActivityWindowEntity {
		const activityWindowEntity = new ActivityWindowEntity();
		activities.forEach((activity) => {
			const activityEntity = new ActivityEntity(
				activity.ownerAccountId,
				activity.sourceAccountId,
				activity.targetAccountId,
				new Date(activity.timestamp),
				MoneyEntity.of(activity.amount),
				activity.id
			)
			activityWindowEntity.addActivity(activityEntity);
		})
		return activityWindowEntity;
	}

	static mapToOrmEntity(activity: ActivityEntity) {
		const activityOrmEntity = new ActivityOrmEntity();
		activityOrmEntity.timestamp = activity.timestamp.getTime();
		activityOrmEntity.ownerAccountId = activity.ownerAccountId;
		activityOrmEntity.sourceAccountId = activity.sourceAccountId;
		activityOrmEntity.targetAccountId = activity.targetAccountId;
		activityOrmEntity.amount = activity.money.amount.toNumber();
		if (activity.id !== null) {
			activityOrmEntity.id = activity.id;
		}
		return activityOrmEntity;
	}
}
