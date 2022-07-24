import {Component, OnInit} from '@angular/core'
import {ProductsService} from '../../services/products.service'
import {Product} from '../../models/product.model'
import {take} from 'rxjs'
import {CategoriesService} from '../../services/categories.service'
import {Category} from '../../models/category.model'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'nx-shop-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  selectedCategories: string[] = []
  products: Product[] = []
  categories: Category[] = []
  isCategoryPage: boolean = false

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      params['categoryId']
        ? this.getProducts(params['categoryId'])
        : this.getProducts()
      params['categoryId']
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false)
    })

    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe(categories => (this.categories = categories))
  }

  private getProducts(categories?: string | null) {
    return this.productsService
      .getProducts(categories)
      .pipe(take(1))
      .subscribe(products => (this.products = products))
  }

  onCategoryChange() {
    this.getProducts(this.selectedCategories.join(','))
  }
}
