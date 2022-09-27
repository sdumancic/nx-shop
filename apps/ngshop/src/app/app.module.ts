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
import {HttpClientModule} from '@angular/common/http'
import {OrdersModule} from '@nx-shop/orders'
import {MessagesComponent} from './shared/messages/messages.component'
import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'
//import {UsersModule} from '@nx-shop/users'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {environment} from '@env/environment'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {ProductsModule} from '@nx-shop/products'

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
    NavComponent,
    MessagesComponent
  ],
  imports: [
    NoopAnimationsModule,
    ProductsModule,
    BrowserModule,
    RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'}),
    UiModule,
    AccordionModule,
    HttpClientModule,
    OrdersModule,
    ToastModule
    /*StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [], */
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
