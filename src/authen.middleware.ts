import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (
      req.get('Authorization') === undefined ||
      req.get('Authorization') !== '20scoop'
    ) {
      throw new UnauthorizedException('Access Unauthorized');
    } else {
      next();
    }
  }
}
