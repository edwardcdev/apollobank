import { registerSchema, loginSchema, changePasswordSchema } from "./../utils/validation";
import { createRefreshToken, createAccessToken } from "../utils/auth";
import {
	Resolver,
	Query,
	Mutation,
	Arg,
	Field,
	ObjectType,
	Ctx,
	UseMiddleware,
	Int,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";
import { MyContext } from "../MyContext";
import { isAuth } from "../middleware";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { ErrorMessages } from "../utils/messages";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;

	@Field(() => User)
	user: User;
}

@Resolver()
export class UserResolver {
	/**
	 * Query to return the current user
	 * Must first check that the user contains the secret token in the authorization header
	 * If the token is found, use jwt to verify the token
	 * If verified, return the user
	 * @param context
	 */
	@Query(() => User, { nullable: true })
	me(@Ctx() context: MyContext) {
		const authorization: string | undefined = context.req.headers["authorization"];

		if (!authorization) {
			return null;
		}

		try {
			const token: string = authorization.split(" ")[1];
			const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
			context.payload = payload as any;
			return User.findOne(payload.userId);
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	/**
	 * Mutation to logout the user
	 * Remove the refresh token once logged out
	 * @param param0
	 */
	@Mutation(() => Boolean)
	async logout(@Ctx() { res }: MyContext) {
		sendRefreshToken(res, "");
		return true;
	}

	/**
	 * Mutation to revoke the refresh token for a user
	 * @param userId
	 */
	@Mutation(() => Boolean)
	async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
		await getConnection().getRepository(User).increment({ id: userId }, "tokenVersion", 1);

		return true;
	}

	/**
	 * Mutation to login
	 * Must use the bcryptjs compare function to verify the users hashed password
	 * If verified, send a refresh token, create an access token and login in the user
	 * @param email
	 * @param password
	 * @param param2
	 */
	@Mutation(() => LoginResponse)
	async login(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Ctx() { res }: MyContext
	): Promise<LoginResponse> {
		// Server side validation for login using Joi
		try {
			await loginSchema.validateAsync({ email: email, password: password });
		} catch (error) {
			throw new Error("Something went wrong.");
		}

		const user: User | undefined = await User.findOne({ where: { email } });

		if (!user) {
			throw new Error(ErrorMessages.LOGIN);
		}

		const valid: boolean = await compare(password, user.password);

		if (!valid) {
			throw new Error(ErrorMessages.PASSWORD);
		}

		// login successful
		sendRefreshToken(res, createRefreshToken(user));

		return {
			accessToken: createAccessToken(user),
			user,
		};
	}

	/**
	 * Mutation to register a new user
	 * Use bcryptjs to hash the password
	 * @param email
	 * @param password
	 * @param firstName
	 * @param lastName
	 * @param dateOfBirth
	 * @param streetAddress
	 * @param postCode
	 * @param city
	 * @param country
	 */
	@Mutation(() => Boolean)
	async register(
		@Arg("email") email: string,
		@Arg("password") password: string,
		@Arg("firsName") firstName: string,
		@Arg("lastName") lastName: string,
		@Arg("dateOfBirth") dateOfBirth: string,
		@Arg("streetAddress") streetAddress: string,
		@Arg("postCode") postCode: string,
		@Arg("city") city: string,
		@Arg("country") country: string
	) {
		// Server side validation for registering using Joi
		try {
			await registerSchema.validateAsync({
				email: email,
				password: password,
				dateOfBirth: dateOfBirth,
			});
		} catch (error) {
			console.log(error);
			return false;
		}

		const hashedPassword: string = await hash(password, 12);

		try {
			await User.insert({
				email,
				password: hashedPassword,
				firstName,
				lastName,
				dateOfBirth,
				streetAddress,
				postCode,
				city,
				country,
			});
		} catch (err) {
			console.log(err);
			return false;
		}

		return true;
	}

	/**
	 * Mutation to update a users existing password
	 * Use the compare function provided by bcryptjs to verify that the old password typed by a user is the existing password
	 * If this is the case, hash the new password and update the password in the database
	 * @param oldPassword
	 * @param newPassword
	 * @param param2
	 */
	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async updatePassword(
		@Arg("oldPassword") oldPassword: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() { payload }: MyContext
	) {
		if (!payload) {
			return false;
		}

		// Server side validation for changing password
		try {
			await changePasswordSchema.validateAsync({
				oldPassword: oldPassword,
				newPassword: newPassword,
			});
		} catch (error) {
			console.log(error);
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			const valid = await compare(oldPassword, owner.password);

			if (valid) {
				const updatedPassword: string = await hash(newPassword, 12);

				try {
					await User.update(
						{
							id: owner.id,
						},
						{
							password: updatedPassword,
						}
					);
				} catch (err) {
					console.log(err);
					return false;
				}
			} else {
				throw new Error(ErrorMessages.UPDATE_PASSWORD);
			}
		}
		return true;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async destroyAccount(@Ctx() { payload }: MyContext) {
		if (!payload) {
			return false;
		}

		const owner: User | undefined = await User.findOne({ where: { id: payload.userId } });

		if (owner) {
			try {
				await User.delete({
					id: owner.id,
				});
			} catch (error) {
				throw new Error(ErrorMessages.DELETE_ACCOUNT);
			}
		}
		return true;
	}
}
