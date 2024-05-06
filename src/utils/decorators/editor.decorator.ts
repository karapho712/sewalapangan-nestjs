import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { omit } from 'lodash';

export const Editor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // to prevent the appearance of role data in the api
    return omit(request.user, 'roles');
  },
);
