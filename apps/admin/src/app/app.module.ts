import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppComponent} from './app.component'
import {RouterModule, Routes} from '@angular/router'
import {ShellComponent} from './shared/shell/shell.component'
import {SidebarComponent} from './shared/sidebar/sidebar.component'
import {DashboardComponent} from './pages/dashboard/dashboard.component'
import {CardModule} from 'primeng/card'
import {ToolbarModule} from 'primeng/toolbar'
import {ButtonModule} from 'primeng/button'
import {TableModule} from 'primeng/table'
import {HttpClientModule} from '@angular/common/http'
import {InputTextModule} from 'primeng/inputtext'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ToastModule} from 'primeng/toast'
import {ConfirmationService, MessageService} from 'primeng/api'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {ConfirmDialogModule} from 'primeng/confirmdialog'
import {ColorPickerModule} from 'primeng/colorpicker'
import {ProductsListComponent} from './pages/products-list/products-list.component'
import {ProductsFormComponent} from './pages/products-form/products-form.component'
import {CategoriesListComponent} from './pages/categories/categories-list/categories-list.component'
import {CategoriesFormComponent} from './pages/categories/categories-form/categories-form.component'
import {InputNumberModule} from 'primeng/inputnumber'
import {DropdownModule} from 'primeng/dropdown'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {InputSwitchModule} from 'primeng/inputswitch'
import {EditorModule} from 'primeng/editor'
import {UiModule} from '@nx-shop/ui'
import {FileUploadModule} from 'primeng/fileupload'
import {UsersListComponent} from './pages/users/users-list/users-list.component'
import {UsersFormComponent} from './pages/users/users-form/users-form.component'
import {TagModule} from 'primeng/tag'
import {InputMaskModule} from 'primeng/inputmask'
import {OrdersListComponent} from './pages/orders/orders-list/orders-list.component'
import {OrdersDetailComponent} from './pages/orders/orders-detail/orders-detail.component'
import {FieldsetModule} from 'primeng/fieldset'
import {UsersModule} from '@nx-shop/users'
import {AppRoutingModule} from './app-routing.module'

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
@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    UsersModule,
    [...UX_MODULE],
    UiModule,
    InputMaskModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
