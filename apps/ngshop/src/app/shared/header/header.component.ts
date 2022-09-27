import {Component, OnInit} from '@angular/core'
import {CartService} from '@nx-shop/cart'

@Component({
  selector: 'shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.initCartLocalStorage()
  }
}
