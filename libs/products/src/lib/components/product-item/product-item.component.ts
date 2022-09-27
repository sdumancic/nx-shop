import {Component, Input, OnInit} from '@angular/core'
import {Product} from '../../models/product.model'
import {CartItem, CartService} from '@nx-shop/cart'

@Component({
  selector: 'nx-shop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | undefined
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    const cartItem: CartItem = {productId: product.id, quantity: 1}
    this.cartService.setCartItem(cartItem)
  }
}
