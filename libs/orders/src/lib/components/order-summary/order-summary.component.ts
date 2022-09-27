import {Component, OnInit} from '@angular/core'
import {Subject, take, takeUntil} from 'rxjs'
import {Router} from '@angular/router'
import {OrdersService} from '../../services/orders.service'
import {CartService} from '@nx-shop/cart'

@Component({
  selector: 'nx-shop-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  totalPrice = 0
  unsubscribe$: Subject<void> = new Subject()
  isCheckout = false

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false)
  }

  ngOnInit(): void {
    this.getOrderSummary()
  }

  private getOrderSummary() {
    this.cartService.cart$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(cart => {
        this.totalPrice = 0
        if (cart) {
          cart.items?.map(item => {
            if (item.productId) {
              this.ordersService
                .getProduct(item.productId)
                .pipe(take(1))
                .subscribe(product => {
                  this.totalPrice +=
                    (product.price ? product.price : 0) *
                    (item.quantity ? item.quantity : 0)
                })
            }
          })
        }
      })
  }

  navigateToCheckout() {
    this.router.navigate(['/checkout'])
  }
}
