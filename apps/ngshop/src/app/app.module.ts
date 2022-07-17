import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppComponent} from './app.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {ProductListComponent} from './pages/product-list/product-list.component'
import {RouterModule, Routes} from '@angular/router'
import {HeaderComponent} from './shared/header/header.component'
import {FooterComponent} from './shared/footer/footer.component'
import {AccordionModule} from 'primeng/accordion'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {UiModule} from '@nx-shop/ui'

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'}),
    UiModule,
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}