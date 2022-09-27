import {Component, OnInit, Optional} from '@angular/core'
import {Category} from '../../models/category.model'
import {CategoriesService} from '../../services/categories.service'
import {take} from 'rxjs'

@Component({
  selector: 'nx-shop-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.css']
})
export class CategoriesBannerComponent implements OnInit {
  categories: Category[] = []

  constructor(@Optional() private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe(res => (this.categories = res))
  }
}
