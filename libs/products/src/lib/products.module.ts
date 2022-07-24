import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ProductSearchComponent} from './components/product-search/product-search.component'
import {CategoriesBannerComponent} from './components/categories-banner/categories-banner.component'
import {RouterModule, Routes} from '@angular/router'
import {ProductItemComponent} from './components/product-item/product-item.component'
import {FeaturedProductsComponent} from './components/featured-products/featured-products.component'
import {ButtonModule} from 'primeng/button'
import {ProductsListComponent} from './components/products-list/products-list.component'
import {CheckboxModule} from 'primeng/checkbox'
import {FormsModule} from '@angular/forms'
import {ProductDetailComponent} from './components/product-detail/product-detail.component'
import {RatingModule} from 'primeng/rating'
import {InputNumberModule} from 'primeng/inputnumber'
import {RippleModule} from 'primeng/ripple'
import {UiModule} from '@nx-shop/ui'

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'products/category/:categoryId',
    component: ProductsListComponent
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent
  }
]

@NgModule({
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    RippleModule,
    UiModule
  ],
  exports: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductDetailComponent
  ],
  providers: []
})
export class ProductsModule {}
