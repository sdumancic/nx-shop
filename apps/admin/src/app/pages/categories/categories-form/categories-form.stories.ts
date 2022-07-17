import {moduleMetadata, storiesOf} from '@storybook/angular'
import {CategoriesFormComponent} from './categories-form.component'
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms'
import {CategoriesService} from '@nx-shop/products'
import {MessageService} from 'primeng/api'
import {CommonModule, Location} from '@angular/common'
import {ActivatedRoute} from '@angular/router'
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {RouterTestingModule} from '@angular/router/testing'
import {CardModule} from 'primeng/card'
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button'
import {TableModule} from 'primeng/table'
import {InputTextModule} from 'primeng/inputtext'
import {ToastModule} from 'primeng/toast'
import {ConfirmDialogModule} from 'primeng/confirmdialog'
import {ColorPickerModule} from 'primeng/colorpicker'
import {InputNumberModule} from 'primeng/inputnumber'
import {DropdownModule} from 'primeng/dropdown'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {InputSwitchModule} from 'primeng/inputswitch'
import {EditorModule} from 'primeng/editor'
import {FileUploadModule} from 'primeng/fileupload'
import {TagModule} from 'primeng/tag'
import {FieldsetModule} from 'primeng/fieldset'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  FileUploadModule,
  TagModule,
  FieldsetModule
]

storiesOf('Categories Form XXX', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule,
        [...UX_MODULE]
      ],
      declarations: [CategoriesFormComponent],
      providers: [CategoriesService, MessageService]
    })
  )
  .add('Default', () => ({
    component: CategoriesFormComponent,
    props: {}
  }))
