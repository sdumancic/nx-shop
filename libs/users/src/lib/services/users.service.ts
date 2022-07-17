import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '@env/environment'
import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}users`)
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}users/${id}`)
  }

  createUser(user: User) {
    return this.http.post<User>(`${environment.apiUrl}`, user)
  }

  updateUser(user: User) {
    return this.http.put<User>(`${environment.apiUrl}users/${user.id}`, user)
  }

  deleteUserById(id: string) {
    return this.http.delete(`${environment.apiUrl}users/${id}`)
  }
}
