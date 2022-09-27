import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Product} from '../models/product.model'
import {API_URL} from '../products.module'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(categories?: string | null): Observable<Product[]> {
    if (!categories) {
      return this.http.get<Product[]>(`${API_URL}products`)
    } else {
      return this.http.get<Product[]>(
        `${API_URL}products?categories=${categories}`
      )
    }
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${API_URL}products/${id}`)
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${API_URL}products`, productData)
  }

  updateProduct(productData: FormData): Observable<Product> {
    return this.http.put<Product>(
      `${API_URL}products/${productData.get('id')}`,
      productData
    )
  }

  getTotalProducts() {
    return this.http.get<{count: number; estimatedCount: number}>(
      `${API_URL}products/stats/count`
    )
  }

  deleteProductById(id: string) {
    return this.http.delete(`${API_URL}products/${id}`)
  }

  getFeatureProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${API_URL}products/stats/featured?count=${count}`
    )
  }
}
