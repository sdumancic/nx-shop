import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '@env/environment'
import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}users/login`, {
      email: email,
      password: password
    })
  }
}
