import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Category} from '../models/category.model'
import {Observable} from 'rxjs'
import {environment} from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}categories`)
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}categories/${id}`)
  }

  createCategory(category: Category) {
    return this.http.post<Category>(`${environment.apiUrl}`, category)
  }

  updateCategory(category: Category) {
    return this.http.put<Category>(
      `${environment.apiUrl}categories/${category.id}`,
      category
    )
  }

  deleteCategoryById(id: string) {
    return this.http.delete(`${environment.apiUrl}categories/${id}`)
  }
}
