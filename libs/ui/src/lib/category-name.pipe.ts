import {HttpClient} from '@angular/common/http'
import {Pipe, PipeTransform} from '@angular/core'
import {Category} from '@nx-shop/products'
import {environment} from '@env/environment'
import {delay, take} from 'rxjs'

@Pipe({
  name: 'categoryNamePipe',
  pure: false
})
export class CategoryNamePipe implements PipeTransform {
  private data: any = null

  constructor(private http: HttpClient) {}

  transform(categoryId: string): any {
    this.http
      .get<Category>(`${environment.apiUrl}categories/${categoryId}`)
      .pipe(take(1), delay(1000))
      .subscribe(result => {
        this.data = result.name
        return this.data
      })
  }
}
