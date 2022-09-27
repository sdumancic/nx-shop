import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {User} from '../models/user.model'
import {LocalStorageService} from './local-storage.service'
import {Router} from '@angular/router'
import {API_URL} from '../users.module'

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
    return this.http.post<User>(`${API_URL}users/login`, {
      email: email,
      password: password
    })
  }

  logout(): void {
    this.localStorageService.clearToken()
    this.router.navigate(['/login'])
  }
}
