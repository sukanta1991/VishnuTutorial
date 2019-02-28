import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private _athService: AuthenticationService,private routerService: RouterService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const booleanPromise = this._athService.isUserAuthenticated(this._athService.getBearerToken());
    return booleanPromise.then( (authenticated) => {
      if ( ! authenticated ) {
         this.routerService.routeToLogin();
      }
    return authenticated;
    });
  }
}
