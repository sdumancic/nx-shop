import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Order} from '../models/order.model'
import {API_URL} from '../orders.module'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL}orders`)
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${API_URL}orders/${id}`)
  }

  createOrder(order: Order) {
    return this.http.post<Order>(`${API_URL}orders`, order)
  }

  updateOrder(order: Order) {
    return this.http.put<Order>(`${API_URL}orders/${order.id}`, order)
  }

  updateOrderStatus(orderId: string, orderStatus: {status: string}) {
    return this.http.put<Order>(`${API_URL}orders/${orderId}`, orderStatus)
  }

  deleteOrderById(id: string) {
    return this.http.delete(`${API_URL}orders/${id}`)
  }

  getOrderCount() {
    return this.http.get<{orderCount: number}>(`${API_URL}orders/stats/count`)
  }

  getTotalSales() {
    return this.http.get<{totalSales: number}>(
      `${API_URL}orders/stats/totalSales`
    )
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<any>(`$API_URL}products/${id}`)
  }
}
