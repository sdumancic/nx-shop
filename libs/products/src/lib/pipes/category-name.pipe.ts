import {HttpClient} from '@angular/common/http'
import {Pipe, PipeTransform} from '@angular/core'
import {delay, take} from 'rxjs'
import {Category} from '../models/category.model'
import {API_URL} from '../products.module'

@Pipe({
  name: 'categoryNamePipe',
  pure: false
})
export class CategoryNamePipe implements PipeTransform {
  private data: any = null

  constructor(private http: HttpClient) {}

  transform(categoryId: string): any {
    this.http
      .get<Category>(`${API_URL}categories/${categoryId}`)
      .pipe(take(1), delay(1000))
      .subscribe(result => {
        this.data = result.name
        return this.data
      })
  }
}
