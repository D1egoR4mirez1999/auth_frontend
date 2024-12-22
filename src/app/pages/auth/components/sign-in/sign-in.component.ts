import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signIn(): void {
    const params = this.signInForm.value as { email: string, password: string };
    
    this.authService.signIn(params).subscribe((response) => {
      console.log(response);
    });
  }
}
