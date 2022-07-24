import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '@env/environment'
import {Product} from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(categories?: string | null): Observable<Product[]> {
    if (!categories) {
      return this.http.get<Product[]>(`${environment.apiUrl}products`)
    } else {
      return this.http.get<Product[]>(
        `${environment.apiUrl}products?categories=${categories}`
      )
    }
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}products/${id}`)
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}products`, productData)
  }

  updateProduct(productData: FormData): Observable<Product> {
    return this.http.put<Product>(
      `${environment.apiUrl}products/${productData.get('id')}`,
      productData
    )
  }

  getTotalProducts() {
    return this.http.get<{count: number; estimatedCount: number}>(
      `${environment.apiUrl}products/stats/count`
    )
  }

  deleteProductById(id: string) {
    return this.http.delete(`${environment.apiUrl}products/${id}`)
  }

  getFeatureProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}products/stats/featured?count=${count}`
    )
  }
}
