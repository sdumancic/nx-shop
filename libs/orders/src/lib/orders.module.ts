import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Route, RouterModule} from '@angular/router'
import {CartIconComponent} from './components/cart-icon/cart-icon.component'
import {BadgeModule} from 'primeng/badge'
import {CartDetailComponent} from './components/cart-detail/cart-detail.component'
import {ButtonModule} from 'primeng/button'
import {InputNumberModule} from 'primeng/inputnumber'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {OrderSummaryComponent} from './components/order-summary/order-summary.component'
import {CheckoutComponent} from './components/checkout/checkout.component'
import {InputTextModule} from 'primeng/inputtext'
import {InputMaskModule} from 'primeng/inputmask'
import {DropdownModule} from 'primeng/dropdown'
import {ThankYouComponent} from './components/thank-you/thank-you.component'
import {AuthGuard} from '@nx-shop/users'
import {CartModule} from '@nx-shop/cart'

export const API_URL = 'http://localhost:3000/api/v1/'
export const ordersRoutes: Route[] = [
  {
    path: 'cart',
    component: CartDetailComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'success',
    component: ThankYouComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes),
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    CartModule
  ],
  exports: [CartIconComponent],
  declarations: [
    CartIconComponent,
    CartDetailComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    ThankYouComponent
  ]
})
export class OrdersModule {}
