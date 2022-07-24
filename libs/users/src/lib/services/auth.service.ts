import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '@env/environment'
import {User} from '../models/user.model'
import {LocalStorageService} from './local-storage.service'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}users/login`, {
      email: email,
      password: password
    })
  }

  logout(): void {
    this.localStorageService.clearToken()
    this.router.navigate(['/login'])
  }
}
