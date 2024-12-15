import { Injectable } from '@angular/core';
import { User } from '../core/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor() { }
    getUserList(): User[] {
        const userList = localStorage.getItem('userCookie');
        return userList ? JSON.parse(userList) : [];
    }
}