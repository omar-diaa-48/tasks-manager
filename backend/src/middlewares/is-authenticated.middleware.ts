import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/modules/users/user.service";
import { JwtPayload } from "src/utilities/types/jwt-payload";

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware {
	constructor(
		@Inject(UserService)
		private userService: UserService,
	) { }


	async use(req: Request, res: Response, next: NextFunction) {
		req["user"] = null;

		const bearerAccessToken = req.header('Authorization');

		if (!bearerAccessToken) {
			return next();
		}

		const accessToken = bearerAccessToken.split(' ')[1]

		// @ts-ignore
		const payload: JwtPayload = this.userService.decode(accessToken);

		if (payload) {
			req["user"] = payload;
		}

		next();
	}
}