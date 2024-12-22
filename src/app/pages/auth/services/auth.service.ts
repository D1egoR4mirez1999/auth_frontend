import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = environment.apiUrl;
  private _currentUser = signal(null);
  private _authState = signal(null);

  signIn(): Observable<boolean> {
    return of(true)
  }
}
