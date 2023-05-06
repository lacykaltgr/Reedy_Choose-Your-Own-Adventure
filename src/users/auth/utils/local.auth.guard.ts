import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


//ha magát az authguradot adjuk meg, az fura viselkedéshez vezet, így létrehoztuk ezt
//local: default name a stratégiához, átálítható
@Injectable()
export class LocalAuthGuard extends AuthGuard('local')  {
  async canActivate(context: ExecutionContext)  {
    const request = context.switchToHttp().getRequest<Request>();
    if (request.isAuthenticated()) return true;
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext)  {
    const request = context.switchToHttp().getRequest<Request>();
    return request.isAuthenticated();
  }
}