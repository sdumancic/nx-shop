import {Component, Input, OnInit} from '@angular/core'
import {Product} from '@nx-shop/products'

@Component({
  selector: 'nx-shop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | undefined
  constructor() {}

  ngOnInit(): void {}
}
