import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {User} from '../models/user.model'
import * as countriesLib from 'i18n-iso-countries'
import {UsersFacade} from '../+state/users.facade'
import {API_URL} from '../users.module'

declare const require: (arg0: string) => countriesLib.LocaleData

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private usersFacade: UsersFacade) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}users`)
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${API_URL}users/${id}`)
  }

  createUser(user: User) {
    return this.http.post<User>(`${API_URL}`, user)
  }

  updateUser(user: User) {
    return this.http.put<User>(`${API_URL}users/${user.id}`, user)
  }

  deleteUserById(id: string) {
    return this.http.delete(`${API_URL}}users/${id}`)
  }

  getCountUsers() {
    return this.http.get<{count: number; estimatedCount: number}>(
      `${API_URL}users/stats/count`
    )
  }

  getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
    return Object.entries(
      countriesLib.getNames('en', {select: 'official'})
    ).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }

  getCountry(countryKey: string) {
    return countriesLib.getName(countryKey, 'en')
  }

  initAppSession() {
    this.usersFacade.buildUserSession()
  }

  get currentUser$(): Observable<User | null> {
    return this.usersFacade.currentUser$
  }

  get isAuthenticated$() {
    return this.usersFacade.isAuthenticated$
  }
}
