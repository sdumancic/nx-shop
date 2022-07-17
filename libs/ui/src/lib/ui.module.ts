import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Route} from '@angular/router'
import {BannerComponent} from './banner/banner.component'
import {SliderComponent} from './slider/slider.component'
import {CategoryNamePipe} from './category-name.pipe'

export const ordersRoutes: Route[] = []

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BannerComponent, SliderComponent, CategoryNamePipe],
  exports: [BannerComponent, SliderComponent, CategoryNamePipe]
})
export class UiModule {}
