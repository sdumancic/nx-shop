import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '@env/environment'
import {Order} from '@nx-shop/orders'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}orders`)
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}orders/${id}`)
  }

  createOrder(order: Order) {
    return this.http.post<Order>(`${environment.apiUrl}`, order)
  }

  updateOrder(order: Order) {
    return this.http.put<Order>(
      `${environment.apiUrl}orders/${order.id}`,
      order
    )
  }

  updateOrderStatus(orderId: string, orderStatus: {status: string}) {
    return this.http.put<Order>(
      `${environment.apiUrl}orders/${orderId}`,
      orderStatus
    )
  }

  deleteOrderById(id: string) {
    return this.http.delete(`${environment.apiUrl}orders/${id}`)
  }

  getOrderCount() {
    return this.http.get<{orderCount: number}>(
      `${environment.apiUrl}orders/stats/count`
    )
  }

  getTotalSales() {
    return this.http.get<{totalSales: number}>(
      `${environment.apiUrl}orders/stats/totalSales`
    )
  }
}
