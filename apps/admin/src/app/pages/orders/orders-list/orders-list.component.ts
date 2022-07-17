import {Component, OnInit} from '@angular/core'
import {Order, OrdersService} from '@nx-shop/orders'
import {take} from 'rxjs'
import {Router} from '@angular/router'
import {ORDER_STATUS} from '../order-constants'
import {ConfirmationService, MessageService} from 'primeng/api'

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = []
  orderStatus = ORDER_STATUS

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getOrders()
  }

  onDeleteOrder(id) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService
          .deleteOrderById(id)
          .pipe(take(1))
          .subscribe(
            () => {
              this.getOrders()
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order is deleted!'
              })
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Order is not deleted!'
              })
            }
          )
      }
    })
  }

  onShowOrder(id) {
    this.router.navigateByUrl(`orders/${id}`)
  }

  private getOrders() {
    this.ordersService
      .getOrders()
      .pipe(take(1))
      .subscribe(orders => (this.orders = orders))
  }
}
