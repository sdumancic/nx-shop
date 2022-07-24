import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Route} from '@angular/router'
import {BannerComponent} from './banner/banner.component'
import {SliderComponent} from './slider/slider.component'
import {CategoryNamePipe} from './category-name.pipe'
import {ButtonModule} from 'primeng/button'
import {GalleryComponent} from './gallery/gallery.component'

export const ordersRoutes: Route[] = []

@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    CategoryNamePipe,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    CategoryNamePipe,
    GalleryComponent
  ]
})
export class UiModule {}
