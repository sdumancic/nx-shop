import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Cart, CartItem} from './cart.model'
import {BehaviorSubject, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject({})

  constructor(private http: HttpClient) {}

  private initialCart = {
    items: []
  }

  emptyCart() {
    localStorage.setItem('cart', JSON.stringify(this.initialCart))
    const cart: Cart | undefined = this.getCart()
    this.cart$.next(cart as Cart)
  }

  initCartLocalStorage() {
    const cart: Cart | undefined = this.getCart()
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify(this.initialCart))
    }
    this.cart$.next(cart as Cart)
  }

  getCart(): Cart | undefined {
    const itemsString = localStorage.getItem('cart')
    if (itemsString) return JSON.parse(itemsString)
    return undefined
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart()
    const index = cart?.items?.findIndex(
      el => el['productId'] === cartItem.productId
    )
    if (index === -1) {
      cart?.items?.push(cartItem)
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cart$.next(cart as Cart)
      return cart as Cart
    } else {
      if (index !== undefined && index !== -1 && cart?.items) {
        const element: CartItem = cart.items[index]
        if (element.quantity) {
          if (!updateCartItem) {
            element.quantity += cartItem.quantity ? cartItem.quantity : 1
          } else {
            element.quantity = cartItem.quantity
          }
          localStorage.setItem('cart', JSON.stringify(cart))
          this.cart$.next(cart as Cart)
          return cart
        }
      }
      this.cart$.next(cart as Cart)
      return cart as Cart
    }
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart()
    if (cart?.items) {
      const newCart = cart?.items.filter(item => item.productId !== productId)
      cart.items = newCart
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cart$.next(cart)
    }
  }
}
