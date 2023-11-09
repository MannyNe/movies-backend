import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// FORWARD THE REQUEST OBJECT IN A SAFE WAY INSTEAD
// OF USING THE @Req COMMON DECORATOR FROM EXPRESS
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  },
);
