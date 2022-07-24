import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppComponent} from './app.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {RouterModule, Routes} from '@angular/router'
import {HeaderComponent} from './shared/header/header.component'
import {FooterComponent} from './shared/footer/footer.component'
import {AccordionModule} from 'primeng/accordion'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {UiModule} from '@nx-shop/ui'
import {NavComponent} from './shared/nav/nav.component'
import {ProductsModule} from '@nx-shop/products'
import {HttpClientModule} from '@angular/common/http'

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'}),
    UiModule,
    AccordionModule,
    ProductsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
