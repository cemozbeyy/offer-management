import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';

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

    submit(): void {
        if (this.validateForm.valid) {
            const userList = this.loginService.getUserList();
            const { username, password } = this.validateForm.value;

            // API simülasyonu: Kullanıcı doğrulaması
            if (userList?.some(user => user.username === username && user.password === password)) {
                this.toastr.success('Giriş Başarılı !!');
                setTimeout(() => {
                    this.router.navigate(['/offer']);
                }, 700);
            } else {
                this.toastr.error('Kullanıcı Adı veya Parola Hatalı !!');
            }
            // localStorage.setItem("userCookie", JSON.stringify(this.validateForm.value))!;

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
