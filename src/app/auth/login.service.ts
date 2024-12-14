import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor() { }
    getUserList(): any[] {
        const userList = localStorage.getItem('userCookie');
        return userList ? JSON.parse(userList) : [];
    }
}