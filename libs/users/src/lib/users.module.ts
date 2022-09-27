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
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import * as fromUsers from './+state/users.reducer'
import {UsersEffects} from './+state/users.effects'
import {UsersFacade} from './+state/users.facade'

export const API_URL = 'http://localhost:3000/api/v1/'
const routes: Routes = [{path: 'login', component: LoginComponent}]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [LoginComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    UsersFacade
  ]
})
export class UsersModule {}
