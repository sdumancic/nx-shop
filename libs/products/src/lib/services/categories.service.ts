import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Category} from '../models/category.model'
import {Observable} from 'rxjs'
import {API_URL} from '../products.module'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}categories`)
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${API_URL}categories/${id}`)
  }

  createCategory(category: Category) {
    return this.http.post<Category>(`${API_URL}`, category)
  }

  updateCategory(category: Category) {
    return this.http.put<Category>(
      `${API_URL}categories/${category.id}`,
      category
    )
  }

  deleteCategoryById(id: string) {
    return this.http.delete(`${API_URL}categories/${id}`)
  }
}
