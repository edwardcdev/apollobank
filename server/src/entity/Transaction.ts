import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Account } from "./Account";
import { Card } from "./Card";

/**
 * Transactions table
 */
@ObjectType()
@Entity("transactions")
export class Transaction extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Account, (account) => account.transactions, { onDelete: "CASCADE" })
	account: Account;

	@ManyToOne(() => Card, (card) => card.transactions, { onDelete: "CASCADE" })
	card: Card;

	@Field()
	@Column()
	transactionType: string;

	@Field()
	@Column({ unique: true })
	date: Date;

	@Field()
	@Column()
	amount: string;
}
