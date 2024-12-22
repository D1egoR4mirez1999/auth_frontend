import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { SignInResponse } from '../interfaces/sign-in.interface';
import { User } from '../interfaces/user.interface';

import { environment } from '../../../../environments/environment';
import { authState } from '../enums/auth-state.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = environment.apiUrl;
  private _currentUser = signal<User | null>(null);
  private _authState = signal<authState>(authState.CHECKING);

  currentUser = computed(() => this._currentUser());
  authState = computed(() => this._authState());

  signIn(params: { email: string, password: string }): Observable<boolean> {
    return this._http.post<SignInResponse>(`${this._apiUrl}/auth/signin`, {
      email: params.email,
      password: params.password
    })
      .pipe(
        tap((response: SignInResponse) => {
          const user: User = {
            _id: response._id,
            email: response.email,
            name: response.name,
            isActive: response.isActive,
            roles: response.roles
          };

          this._currentUser.set(user);
          this._authState.set(authState.AUTHENTICATED);
          localStorage.setItem('token', response.token);
        }),
        map(() => true),
        catchError((err) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
