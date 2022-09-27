import {Component, OnInit} from '@angular/core'
import {ProductsService} from '../../services/products.service'
import {ActivatedRoute} from '@angular/router'
import {Product} from '../../models/product.model'
import {take} from 'rxjs'
import {CartItem, CartService} from '@nx-shop/cart'

@Component({
  selector: 'nx-shop-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined
  quantity = 1
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productId']) {
        this.getProduct(params['productId'])
      }
    })
  }

  private getProduct(id: string) {
    this.productService
      .getProduct(id)
      .pipe(take(1))
      .subscribe(response => {
        this.product = response
      })
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem)
  }
}
