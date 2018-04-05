import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Md5 } from 'ts-md5/dist/md5';

import { AuthService } from '../auth.service';
import { Login } from './login';

@Component({
  selector: 'gplay-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  formError = {
    status: true,
    message: '',
  };
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(formData: FormGroup) {
    this.submitted = true;
    formData.value.password = Md5.hashStr(formData.value.password);

    if (formData.valid) {
      this.authService
        .login(formData.value.username, formData.value.password)
        .subscribe(
          response => {
            console.log('User is logged in ', response);
            this.router.navigateByUrl('/logged');
          },
          err => {
            this.formError.status = true;
            console.warn(err);
            if (err.status === 401) {
              this.formError.message = 'Username o password errate';
            }
            if (err.status === 404) {
              this.formError.message =
                'Servizio momentaneamente non raggiungibile';
            }
          }
        );
    }
  }
}
