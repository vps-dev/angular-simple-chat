import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }
}
