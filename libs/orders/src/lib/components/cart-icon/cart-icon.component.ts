import {Component, OnInit} from '@angular/core'
import {CartService} from '@nx-shop/cart'

@Component({
  selector: 'nx-shop-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  cartCount: number | undefined = 0
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart?.items?.length ?? 0
    })
  }
}
