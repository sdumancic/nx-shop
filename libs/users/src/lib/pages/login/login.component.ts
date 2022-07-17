import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../services/auth.service'
import {take} from 'rxjs'
import {User} from '@nx-shop/users'
import {HttpErrorResponse} from '@angular/common/http'
import {LocalStorageService} from '../../services/local-storage.service'
import {Router} from '@angular/router'

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup | undefined
  authError = false
  authErrorMsg = 'Email or password are wrong'
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm()
  }

  private initLoginForm() {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get loginForm() {
    return this.loginFormGroup?.controls
  }

  submit() {
    this.loginFormGroup?.markAllAsTouched()
    this.loginFormGroup?.get('email')?.markAsDirty()
    this.loginFormGroup?.get('password')?.markAsDirty()
    if (this.loginFormGroup?.valid) {
      const {email, password} = this.loginFormGroup.value
      this.authService
        .login(email, password)
        .pipe(take(1))
        .subscribe({
          next: (user: User) => {
            this.authError = false
            if (user.token) {
              this.localStorageService.setToken(user.token)
            }
            this.router.navigate(['/'])
          },
          error: (error: HttpErrorResponse) => {
            this.authError = true
            if (error.status !== 400) {
              this.authErrorMsg = error.message
            }
          }
        })
    }
  }
}
