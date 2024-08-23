import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Import Router
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  loginForm: FormGroup;
  //returnUrl: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private route: ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    //this.returnUrl = '/';
  }

  // ngOnInit(): void {
    
  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  // }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        success => {
          if (success) {
            console.log('Login successful.');
            // Navigate to product page on successful login
            this.router.navigate(['/product']);
            // this.router.navigate(['/shipping']);
            // this.router.navigate([this.returnUrl]);
           
          } else {
            console.error('Invalid email or password.');
            // Show error message
          }
        },
        error => {
          console.error('Login failed:', error);
          // Handle error
        }
      );
    }
  }
}
