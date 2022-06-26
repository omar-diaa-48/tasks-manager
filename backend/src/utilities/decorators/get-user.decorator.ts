import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtPayload } from "../../utilities/types/jwt-payload";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): JwtPayload => {
	const req: Request = ctx.switchToHttp().getRequest();

	if (!req["user"]) {
		throw new UnauthorizedException();
	}

	//@ts-ignore
	return req["user"];
});
