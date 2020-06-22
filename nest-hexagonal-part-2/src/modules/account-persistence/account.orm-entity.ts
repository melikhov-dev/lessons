import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity( 'Account', {})
export class AccountOrmEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	userId: string;
}
