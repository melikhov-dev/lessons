import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity( 'Activity', {})
export class ActivityOrmEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	timestamp: number;

	@Column()
	ownerAccountId: string;

	@Column()
	sourceAccountId: string;

	@Column()
	targetAccountId: string;

	@Column()
	amount: number;
}
