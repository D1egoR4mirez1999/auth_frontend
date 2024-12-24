import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './pages/auth/services/auth.service';
import { authState } from './pages/auth/enums/auth-state.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  isCheckingState = computed<boolean>(() => {
    return this.authService.authState() === authState.CHECKING;
  });

  ngOnInit(): void {
    this.authService.refreshToken().subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.router.navigate(['/auth/sign-in']);
      },
    });
  }
}
