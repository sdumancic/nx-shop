import {Component, OnInit} from '@angular/core'
import {Order, OrdersService} from '@nx-shop/orders'
import {ActivatedRoute} from '@angular/router'
import {ORDER_STATUS} from '../order-constants'
import {take} from 'rxjs'

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {
  orderStatuses = []
  selectedStatus = null
  order: Order
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mapOrderStatus()
    this.getOrder()
  }

  private getOrder() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderService.getOrder(params['id']).subscribe(order => {
          this.order = order
          this.selectedStatus = order.status
        })
      }
    })
  }

  private mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

  onStatusChange(event: Event) {
    this.orderService
      .updateOrderStatus(this.order.id, {status: event['value']})
      .pipe(take(1))
      .subscribe(result => console.log(result))
  }
}
