import {Component, OnInit} from '@angular/core'
import {CategoriesService} from '@nx-shop/products'
import {ConfirmationService, MessageService} from 'primeng/api'
import {Router} from '@angular/router'
import {User, UsersService} from '@nx-shop/users'
import {take} from 'rxjs'
import * as countriesLib from 'i18n-iso-countries'

declare const require

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = []

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
    this.loadUsers()
  }

  private loadUsers(): void {
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe(data => (this.users = data))
  }

  onDeleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService
          .deleteUserById(id)
          .pipe(take(1))
          .subscribe(result => {
            this.messageService.add({
              severity: 'success',
              summary: 'User deleted',
              detail: 'User is deleted'
            })
            this.loadUsers()
          })
      }
    })
  }

  onEditUser(id: string): void {
    this.router.navigateByUrl(`users/form/${id}`)
  }

  getCountryName(country: any) {
    return countriesLib.getName(country, 'en')
  }
}
