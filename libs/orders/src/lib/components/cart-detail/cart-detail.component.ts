import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {take} from 'rxjs'
import {OrdersService} from '../../services/orders.service'
import {CartItemDetailed, CartService} from '@nx-shop/cart'

@Component({
  selector: 'nx-shop-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartItemDetailed: CartItemDetailed[] = []
  cartCount = 0

  quantity: any
  getTotalValue(item: any): number {
    return item.product.price * item.quantity
  }

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.getCartDetails()
  }

  backToShop() {
    this.router.navigate(['/products'])
  }

  deleteItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id)
    const index = this.cartItemDetailed.findIndex(
      el => el.product.id === cartItem.product.id
    )
    this.cartItemDetailed.splice(index, 1)
    this.cartCount = this.cartItemDetailed.length
  }

  private getCartDetails() {
    this.cartService.cart$.pipe(take(1)).subscribe(resCart => {
      //this.cartItemDetailed = []
      this.cartCount = resCart?.items?.length ?? 0
      resCart.items?.forEach(cartItem => {
        if (cartItem.productId) {
          this.ordersService.getProduct(cartItem.productId).subscribe(res => {
            this.cartItemDetailed.push({
              product: res,
              quantity: cartItem.quantity
            })
          })
        }
      })
    })
  }

  onQuantityChanged(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    )
  }
}
