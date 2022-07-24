import {Component, OnInit} from '@angular/core'
import {OrdersService} from '@nx-shop/orders'
import {take} from 'rxjs'
import {UsersService} from '@nx-shop/users'
import {Product, ProductsService} from '@nx-shop/products'

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  orderCount: number
  totalSales: number
  countUsers: number
  countProducts: number

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.ordersService
      .getOrderCount()
      .pipe(take(1))
      .subscribe(res => (this.orderCount = res.orderCount))

    this.ordersService
      .getTotalSales()
      .pipe(take(1))
      .subscribe(res => (this.totalSales = res.totalSales))

    this.usersService
      .getCountUsers()
      .pipe(take(1))
      .subscribe(res => (this.countUsers = res.count))

    this.productsService
      .getTotalProducts()
      .pipe(take(1))
      .subscribe(res => (this.countProducts = res.count))
  }
}
