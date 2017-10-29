import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_username: string;
  login_password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.login_username, this.login_password).then((res) => {
      this.flashMessagesService.show('You are logged in', {
        cssClass:'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }).catch((err) => {
      this.flashMessagesService.show(err.message, {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['/login']);
    });
  }
}
