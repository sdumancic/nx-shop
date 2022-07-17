import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '@env/environment'
import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static TOKEN = 'jwtToken'
  constructor() {}

  setItem(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  setToken(value: string) {
    this.setItem(LocalStorageService.TOKEN, value)
  }

  getItem(key: string): string | null {
    const val = localStorage.getItem(key)
    if (val) return val
    else return null
  }

  getToken() {
    return this.getItem(LocalStorageService.TOKEN)
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  clearToken() {
    this.removeItem(LocalStorageService.TOKEN)
  }
}
