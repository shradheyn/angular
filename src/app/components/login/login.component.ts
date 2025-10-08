import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule], //using templatedriven forms (HTML) -ngModel
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   loginData = { email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = ''; // Property to store success message

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData).subscribe({ //invoke service method to login
        next: (response: boolean) => {
          if (response) {

              // Start session management
             this.authService.setSession('some-auth-token', this.loginData.email);
              
            this.successMessage = 'Login Success. Redirecting...'; // Set success message
            setTimeout(() => {
              this.router.navigate(['/']); // Navigate to the dashboard or home page
            },500)
            
          } else {
            this.errorMessage = 'Invalid login credentials.';
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = 'An error occurred during login.';
        }
      });
    }
  }
}
