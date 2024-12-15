import { Observable, of } from "rxjs";
import { User } from "../interfaces/user.interface";

export interface ILoginResponse {
  token?: string
  status: LoginStatus
  errorMessage?: string
}

export enum LoginStatus {
  Succeceed,
  Failed,
}

export function authenticateUser$(userList: User[], username: string, password: string): Observable<ILoginResponse> {
  const existsUser = userList.some(user => user.username === username && user.password === password);

  if (existsUser) {
    return of({
      token: generateToken(),
      status: LoginStatus.Succeceed
    });
  }

  return of({
    status: LoginStatus.Failed,
    errorMessage: 'Kullanıcı adı veya şifre hatalı'
  })
}

function generateToken() {
  return Math.random().toString(36).substr(2);
}

