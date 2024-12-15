import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LS_USER_COOKIE } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const isHaveCookie = localStorage.getItem(LS_USER_COOKIE);
    if (isHaveCookie) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
