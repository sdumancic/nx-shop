import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LoginComponent} from './pages/login/login.component'
import {RouterModule, Routes} from '@angular/router'
import {InputTextModule} from 'primeng/inputtext'
import {ButtonModule} from 'primeng/button'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {JwtInterceptor} from './services/jwt.interceptor'
import {HTTP_INTERCEPTORS} from '@angular/common/http'

const routes: Routes = [{path: 'login', component: LoginComponent}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class UsersModule {}
