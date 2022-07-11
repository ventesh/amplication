import getRawBody from 'raw-body';
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PlainBody = createParamDecorator(async (_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<import("express").Request>();
  if (!req.readable) {
    throw new HttpException('Body is not text/plain', HttpStatus.BAD_REQUEST);    
  }
  return (await getRawBody(req)).toString().trim();
});