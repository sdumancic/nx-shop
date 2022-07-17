import {Component, OnInit, ViewChild} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
  Review
} from '@nx-shop/products'
import {take, timer} from 'rxjs'
import {MessageService} from 'primeng/api'
import {Location} from '@angular/common'
import {ActivatedRoute} from '@angular/router'
import {FileUpload} from 'primeng/fileupload'

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload
  @ViewChild('img') img: HTMLImageElement
  editMode = false
  currentImage: any

  form: FormGroup
  categories = []
  uploadedFiles: any[] = []
  currentProductId: string

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm()
    this.getCategories()
    this.checkEditMode()
  }

  private checkEditMode() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true

        this.currentProductId = params['id']
        this.productsService
          .getProduct(this.currentProductId)
          .subscribe(async product => {
            this.form.patchValue({
              id: this.currentProductId,
              name: product.name,
              description: product.description,
              brand: product.brand,
              price: product.price,
              rating: product.rating,
              numReviews: product.numReviews,
              isFeatured: product.isFeatured,
              category: product.category.id,
              countInStock: product.countInStock,
              richDescription: product.richDescription
            })
            this.currentImage = product.image
            this.productForm['image'].setValidators([])
            this.productForm['image'].updateValueAndValidity()
            /*this.getFileFromLink(product.image).then(file => {
              this.fileUpload.clear()
              this.fileUpload.files.push(file)
              this.form.patchValue({
                image: file
              })
              this.form.get('image').updateValueAndValidity()
            })*/
          })
      }
    })
  }

  private getFilenameFromContentDisposition(res) {
    let filename = null

    const disposition = res.headers.get('content-disposition')

    if (disposition?.includes('attachment')) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = filenameRegex.exec(disposition)
      if (matches?.[1]) {
        filename = matches[1].replace(/['"]/g, '')
        // Sometimes the filename comes in a URI encoded format so decode it
        filename = decodeURIComponent(filename)
        // Sometimes the filename starts with UTF-8, remove that
        filename = filename.replace(/^UTF-8/i, '').trim()
      }
    }

    return filename
  }

  private async getFileFromLink(url) {
    const fileRes = await fetch(url)
    const blob = await fileRes.blob()

    let fileName = this.getFilenameFromContentDisposition(fileRes)
    if (!fileName) {
      fileName = url.split('/').pop()
    }

    const file = new File([blob], fileName, {
      type: blob.type
    })

    return file
  }

  private initForm() {
    this.form = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),

      rating: new FormControl(null),
      numReviews: new FormControl(null),
      isFeatured: new FormControl(false),
      category: new FormControl('', [Validators.required]),

      countInStock: new FormControl(null),
      richDescription: new FormControl('')
    })
  }
  get productForm() {
    return this.form.controls
  }

  onCreateOrUpdate() {
    this.form.markAllAsTouched()
    this.form.get('name')?.markAsDirty()
    this.form.get('brand')?.markAsDirty()
    this.form.get('price')?.markAsDirty()
    this.form.get('category')?.markAsDirty()
    this.form.get('image')?.markAsDirty()
    if (this.form.invalid) {
      return
    }

    const productFormData = new FormData()
    productFormData.append('id', this.productForm['id'].value)
    productFormData.append('name', this.productForm['name'].value)
    productFormData.append('description', this.productForm['description'].value)
    productFormData.append('brand', this.productForm['brand'].value)
    productFormData.append('price', this.productForm['price'].value || 0)
    productFormData.append('rating', this.productForm['rating'].value || 0)
    productFormData.append(
      'numReviews',
      this.productForm['numReviews'].value || 0
    )
    productFormData.append(
      'isFeatured',
      this.productForm['isFeatured'].value || false
    )
    productFormData.append('category', this.productForm['category'].value)
    productFormData.append(
      'countInStock',
      this.productForm['countInStock'].value || 0
    )
    productFormData.append(
      'richDescription',
      this.productForm['richDescription'].value
    )

    productFormData.set('image', this.productForm['image'].value)

    if (!this.editMode) {
      this.addProduct(productFormData)
    } else {
      this.editProduct(productFormData)
    }
  }

  onCancel() {}

  private addProduct(productFormData: FormData) {
    this.productsService
      .createProduct(productFormData)
      .pipe(take(1))
      .subscribe({
        next: (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product ${product.name} is created`
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
            summary: 'Product not created',
            detail: 'Error when creating product ' + e.detail
          })
        }
      })
  }

  private editProduct(productData: FormData) {
    this.productsService
      .updateProduct(productData)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.messageService.add({
            severity: 'success',
            summary: 'Product updated',
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
            summary: 'Product not created',
            detail: 'Error when creating product ' + e.detail
          })
        }
      })
  }

  private getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe(cats => (this.categories = cats))
  }

  onSelect(event: any) {
    console.log('onselect', event.currentFiles[0])
    this.form.get('image').updateValueAndValidity()
    console.log(this.fileUpload.files)
  }
}
