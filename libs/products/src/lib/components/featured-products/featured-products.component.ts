import {Component, OnInit} from '@angular/core'
import {ProductsService} from '../../services/products.service'
import {take} from 'rxjs'
import {Product} from '@nx-shop/products'

@Component({
  selector: 'nx-shop-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  products: Product[] = []
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService
      .getFeatureProducts(4)
      .pipe(take(1))
      .subscribe(products => {
        this.products = products
      })
  }
}
