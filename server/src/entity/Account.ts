import { ObjectType, Field, Int } from "type-graphql";
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";

/**
 * Accounts table
 */
@ObjectType()
@Entity("accounts")
export class Account extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (owner) => owner.accounts, { onDelete: "CASCADE" })
	owner: User;

	@Field()
	@Column({ default: "00-00-00", nullable: true })
	sortCode: string;

	@Field()
	@Column({ nullable: true })
	iban: string;

	@Field()
	@Column({ nullable: true })
	bic: string;

	@Field()
	@Column()
	currency: string;

	@Field()
	@Column({ default: 1000 })
	balance: number;

	@OneToMany(() => Transaction, (transaction) => transaction.account, { onDelete: "CASCADE" })
	transactions: Transaction[];
}
