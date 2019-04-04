import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  public get currentUser(): string {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  login(username: string) {
    localStorage.setItem('currentUser', JSON.stringify(username));
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
