import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(value: any) {
    //console.log(value);
    if(this.loginForm.status=='INVALID') return;
    this.authService.login(value.username, value.password).then((res) => {
      console.log('success');
      this.router.navigate(['/']);
    }).catch((err) => {
      console.log('failure'+err);
      this.router.navigate(['/login']);
    });
  }

  //get username() { return this.loginForm.get('username'); }
}
