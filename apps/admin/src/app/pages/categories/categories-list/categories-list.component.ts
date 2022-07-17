import {Component, OnInit} from '@angular/core'
import {take} from 'rxjs'
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService
} from 'primeng/api'
import {Router} from '@angular/router'
import {CategoriesService, Category} from '@nx-shop/products'

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = []

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  private loadCategories(): void {
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe(data => (this.categories = data))
  }
  onDeleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService
          .deleteCategoryById(id)
          .pipe(take(1))
          .subscribe(result => {
            this.messageService.add({
              severity: 'success',
              summary: 'Category deleted',
              detail: 'Category is deleted'
            })
            this.loadCategories()
          })
      }
    })
  }

  onEditCategory(id: string): void {
    this.router.navigateByUrl(`categories/form/${id}`)
  }
}
