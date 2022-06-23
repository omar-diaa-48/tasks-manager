import { forwardRef, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "src/utilities/types/jwt-payload";

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware {
	constructor(
		@Inject(forwardRef(() => JwtService))
		private jwtService: JwtService,
	) { }


	async use(req: Request, res: Response, next: NextFunction) {
		req["user"] = null;

		const bearerAccessToken = req.header('Authorization');

		if (!bearerAccessToken) {
			return next();
		}

		const accessToken = bearerAccessToken.split(' ')[1]

		// @ts-ignore
		const payload: JwtPayload = this.jwtService.decode(accessToken);

		if (payload) {
			req["user"] = payload;
		}

		next();
	}
}