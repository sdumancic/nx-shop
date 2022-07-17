import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {take, timer} from 'rxjs'
import {MessageService} from 'primeng/api'
import {Location} from '@angular/common'
import {ActivatedRoute} from '@angular/router'
import {CategoriesService, Category} from '@nx-shop/products'

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup

  editMode = false

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required]),
      color: new FormControl('#fff', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.checkEditMode()
    console.log('xx')
  }

  private checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true
        this.categoryService.getCategory(params['id']).subscribe(category => {
          this.form.patchValue({
            id: params['id'],
            name: category.name,
            icon: category.icon,
            color: category.color
          })
        })
      }
    })
  }

  get categoryForm() {
    return this.form.controls
  }

  onCreateOrUpdate(): void {
    this.form.get('name')?.markAsTouched()
    this.form.get('name')?.markAsDirty()
    this.form.get('icon')?.markAsTouched()
    this.form.get('icon')?.markAsDirty()

    if (this.form.invalid) {
      return
    }
    const category: Category = {
      id: this.form.get('id')?.value,
      name: this.form.get('name')?.value,
      icon: this.form.get('icon')?.value,
      color: this.form.get('color')?.value
    }

    if (!this.editMode) {
      this.categoryService
        .createCategory(category)
        .pipe(take(1))
        .subscribe({
          next: (category: Category) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Category ${category.name} is created`
            })
            timer(1000)
              .pipe(take(1))
              .subscribe(() => {
                this.location.back()
              })
          },
          error: e => {
            this.messageService.add({
              severity: 'error',
              summary: 'Category created',
              detail: 'Error when creating category ' + e.detail
            })
          }
        })
    } else {
      this.editCategory(category)
    }
  }

  private editCategory(category: Category) {
    this.categoryService
      .updateCategory(category)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.messageService.add({
            severity: 'success',
            summary: 'Category updated',
            detail: JSON.stringify(res)
          })
          timer(200)
            .pipe(take(1))
            .subscribe(() => {
              this.location.back()
            })
        },
        error: e => {
          this.messageService.add({
            severity: 'error',
            summary: 'Category created',
            detail: 'Error when creating category ' + e.detail
          })
        }
      })
  }
}
