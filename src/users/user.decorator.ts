import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (data: 'userId' | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request & { user: { userId: number } }>();
        const user = request.user;
        return data ? user[data] : user;
    },
);