import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { LoginStatus } from '../../core/mock-be';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule
  ],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  //Injections START
  private router = inject(Router);
  private fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  loginService = inject(LoginService);
  //Injections END
  constructor() {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
      isLogin: true
    });
  }

  ngOnInit(): void { }

  async submit() {
    if (this.validateForm.valid) {
      const userList = this.loginService.getUserList();
      const { username, password } = this.validateForm.value;

      // API simülasyonu: Kullanıcı doğrulaması
      this.loginService.login$(username, password).subscribe((response) => {
        if (response.status == LoginStatus.Succeceed) {
          this.toastr.success('Giriş Başarılı !!');

          this.router.navigate(['/offer']);
        } else {
          this.toastr.error(response.errorMessage);
        }
      })

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
