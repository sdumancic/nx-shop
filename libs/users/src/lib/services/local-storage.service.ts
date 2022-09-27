import {Injectable} from '@angular/core'

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

  isTokenValid() {
    const token = this.getToken()
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]))
      return !this.tokenExpired(tokenDecode.exp)
    }
    return false
  }

  private tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration
  }

  clearToken() {
    this.removeItem(LocalStorageService.TOKEN)
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken()
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]))
      if (tokenDecode) {
        return tokenDecode.userId
      }
      return null
    }
    return null
  }
}
