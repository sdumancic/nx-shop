import {Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {User, UsersService} from '@nx-shop/users'
import {Subject, take, takeUntil} from 'rxjs'
import {ORDER_STATUS} from '../../models/order-constants'
import {OrdersService} from '../../services/orders.service'
import {OrderItem} from '../../models/order-item.model'
import {Order} from '../../models/order.model'
import {CartService} from '@nx-shop/cart'

@Component({
  selector: 'nx-shop-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject()

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
  checkoutFormGroup!: FormGroup
  isSubmitted = false
  orderItems: OrderItem[] = []
  userId: string = ''
  countries: {id: string; name: string}[] = []

  ngOnInit(): void {
    this._initCheckoutForm()
    this._getCountries()
    this._getCartItems()
    this._autoFillUserData()
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    })
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries()
  }

  backToCart() {
    this.router.navigate(['/cart'])
  }

  placeOrder() {
    this.isSubmitted = true
    if (this.checkoutFormGroup.invalid) {
      return
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutFormGroup.get('street')?.value,
      shippingAddress2: this.checkoutFormGroup.get('apartment')?.value,
      city: this.checkoutFormGroup.get('city')?.value,
      zip: this.checkoutFormGroup.get('zip')?.value,
      country: this.checkoutFormGroup.get('country')?.value,
      phone: this.checkoutFormGroup.get('phone')?.value,
      status: Object.keys(ORDER_STATUS)[0],
      totalPrice: this.checkoutFormGroup.get('totalPrice')?.value,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }
    this.ordersService
      .createOrder(order)
      .pipe(take(1))
      .subscribe(
        res => {
          this.cartService.emptyCart()
          this.router.navigate(['/success'])
        },
        () => {}
      )
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls
  }

  private _getCartItems() {
    const items = this.cartService.getCart()?.items
    if (items !== undefined) {
      this.orderItems = items.map(item => {
        return {
          product: item.productId,
          quantity: item.quantity
        }
      })
    }
  }

  private _autoFillUserData() {
    this.usersService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | null) => {
        if (user) {
          this.userId = user.id ?? ''
          this.checkoutForm['name'].setValue(user?.name ?? null)
          this.checkoutForm['email'].setValue(user?.email ?? null)
          this.checkoutForm['phone'].setValue(user?.phone ?? null)
          this.checkoutForm['city'].setValue(user?.city ?? null)
          this.checkoutForm['country'].setValue(user?.country ?? null)
          this.checkoutForm['zip'].setValue(user?.zip ?? null)
          this.checkoutForm['apartment'].setValue(user?.apartment ?? null)
          this.checkoutForm['street'].setValue(user?.street ?? null)
        }
      })
  }
}
