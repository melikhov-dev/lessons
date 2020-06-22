import {AccountId} from './account.entity';
import {MoneyEntity} from './money.entity';

export type ActivityId = number | null;

export class ActivityEntity {
	constructor(
		private readonly _ownerAccountId: AccountId,
		private readonly _sourceAccountId: AccountId,
		private readonly _targetAccountId: AccountId,
		private readonly _timestamp: Date,
		private readonly _money: MoneyEntity,
		private readonly _id?: ActivityId
	) {}

	get id(): ActivityId {
		return this._id !== undefined ? this._id : null;
	}

	get ownerAccountId(): AccountId {
		return this._ownerAccountId;
	}

	get sourceAccountId(): AccountId {
		return this._sourceAccountId;
	}

	get targetAccountId(): AccountId {
		return this._targetAccountId;
	}

	get timestamp(): Date {
		return this._timestamp;
	}

	get money(): MoneyEntity {
		return this._money;
	}
}
