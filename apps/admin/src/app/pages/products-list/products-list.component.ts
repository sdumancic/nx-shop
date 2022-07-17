import {Component, OnInit} from '@angular/core'
import {Product, ProductsService} from '@nx-shop/products'
import {take} from 'rxjs'
import {ConfirmationService, MessageService} from 'primeng/api'
import {Router} from '@angular/router'

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = []
  ž
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  private loadProducts(): void {
    this.productsService
      .getProducts()
      .pipe(take(1))
      .subscribe(data => (this.products = data))
  }

  onDeleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService
          .deleteProductById(id)
          .pipe(take(1))
          .subscribe(result => {
            this.messageService.add({
              severity: 'success',
              summary: 'Product deleted',
              detail: 'Product is deleted'
            })
            this.loadProducts()
          })
      }
    })
  }

  onEditProduct(id) {
    this.router.navigateByUrl(`products/form/${id}`)
  }
}
