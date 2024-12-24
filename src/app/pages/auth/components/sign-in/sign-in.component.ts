import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  
  signInForm = this.formBuilder.group({
    email: ['dialrasa@google.com', [Validators.required, Validators.email]],
    password: ['diego12345', [Validators.required, Validators.minLength(6)]]
  });

  signIn(): void {
    const params = this.signInForm.value as { email: string, password: string };
    
    this.authService.signIn(params).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        Swal.fire(err);
      }
    });
  }
}
