import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

const excludedRoutes = ['/auth/login', '/auth/signup', '/auth/signup'];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const { originalUrl: reqUrl } = ctx.getRequest();

    if (excludedRoutes.includes(reqUrl)) return true;

    return super.canActivate(context);
  }
}
