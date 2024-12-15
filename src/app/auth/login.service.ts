import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LS_USER_COOKIE } from '../core/constants';
import { User } from '../core/interfaces/user.interface';
import { authenticateUser$, ILoginResponse } from '../core/mock-be';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor() { }

  getUserList(): User[] {
    const userList = localStorage.getItem(LS_USER_COOKIE);
    return userList ? JSON.parse(userList) : [];
  }

  login$(username: string, password: string): Observable<ILoginResponse> {
    const userList = this.getUserList();

    return authenticateUser$(userList, username, password);
  }
}
