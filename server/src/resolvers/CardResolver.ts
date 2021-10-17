import { createRandomCardNumber, createRandomNumber } from "./../utils/createRandom";
import { MyContext } from "./../MyContext";
import { isAuth } from "../middleware";
import { Resolver, Mutation, UseMiddleware, Ctx, Query } from "type-graphql";
import { User } from "../entity/User";
import { Account } from "../entity/Account";
import { Card } from "../entity/Card";

@Resolver()
export class CardResolver {
	/**
	 * Query for returning all the cards for an authenticated user
	 * @param param0
	 */
	@Query(() => [Card])
	@UseMiddleware(isAuth)
	async cards(@Ctx() { payload }: MyContext) {
		if (!payload) {
			return null;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const account: Account | undefined = await Account.findOne({ where: { owner: owner } });

			if (account) {
				const cards = await Card.find({ where: { account: account } });
				return cards;
			}
		}
		return null;
	}

	/**
	 * Mutation for creating a new card
	 * @param param0
	 */
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async createCard(@Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			try {
				await Card.insert({
					owner,
					cardNumber: createRandomCardNumber(),
					expiresIn: new Date(2023, 9),
					pin: parseInt(createRandomNumber(4)),
					cvv: parseInt(createRandomNumber(3)),
					monthlySpendingLimit: 500,
				});
			} catch (err) {
				console.log(err);
				return false;
			}
		}

		return true;
	}
}
