import {Component, OnInit} from '@angular/core'
import {UsersService} from '@nx-shop/users'

@Component({
  selector: 'shop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngshop'

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.initAppSession()
  }
}
