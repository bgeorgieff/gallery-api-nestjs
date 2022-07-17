import { createParamDecorator } from '@nestjs/common';

export const ExtractUser = createParamDecorator((data, req) => {
  return req.args[0].user;
});
