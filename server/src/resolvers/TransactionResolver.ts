import { Account } from "./../entity/Account";
import { Transaction } from "./../entity/Transaction";
import { User } from "./../entity/User";
import { MyContext } from "./../MyContext";
import { isAuth } from "../middleware";
import { Resolver, Query, UseMiddleware, Ctx, Mutation, Arg, Float } from "type-graphql";
import faker from "faker";

@Resolver()
export class TransactionResolver {
	/**
	 * Query for returning all transactions for an authenticated users currency account
	 * @param currency
	 * @param param1
	 */
	@Query(() => [Transaction])
	@UseMiddleware(isAuth)
	async transactions(@Arg("currency") currency: string, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return null;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: currency },
			});

			if (account) {
				return Transaction.find({ where: { account: account } });
			}
		}

		return null;
	}

	/**
	 * Mutation for creating a new transaction
	 * @param currency
	 * @param param1
	 */
	@Mutation(() => Float)
	@UseMiddleware(isAuth)
	async createTransaction(@Arg("currency") currency: string, @Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account: Account | undefined = await Account.findOne({
				where: { owner: owner, currency: currency },
			});

			if (account) {
				// Generate fake financial data using faker
				let transactionType: string = faker.finance.transactionType();
				let amount: number = parseInt(faker.finance.amount());
				let date: Date = faker.date.recent(31);
				let balance: number = account.balance;

				if (balance <= 0) {
					throw new Error("You do not have the sufficient funds.");
				}

				// Update account balance depending on the transaction type faker generates
				switch (transactionType) {
					case "withdrawal":
						balance -= amount;
						break;
					case "deposit":
						balance += amount;
						break;
					case "payment":
						balance -= amount;
						break;
					case "invoice":
						balance -= amount;
						break;
				}

				try {
					await Transaction.insert({
						account,
						transactionType: transactionType,
						date: date,
						amount: amount.toString(),
					});
					await Account.update(
						{
							id: account.id,
						},
						{ balance: balance }
					);
				} catch (err) {
					console.log(err);
					return null;
				}
			}
		}

		// In order to update the total account balance, return the above updated Accounts balance
		const updatedAccount = await Account.findOne({ where: { owner: owner, currency: currency } });

		if (updatedAccount) {
			return updatedAccount.balance;
		}

		return null;
	}
}
