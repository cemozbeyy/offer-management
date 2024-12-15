import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { LS_USER_COOKIE } from '../../core/constants';

@Component({
    selector: 'signup-component',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NzButtonModule,
        NzCheckboxModule,
        NzFormModule,
        NzInputModule
    ]
})

export class SignUpComponent implements OnInit {
    validateSignUpForm: FormGroup;

    private router = inject(Router);
    private fb = inject(FormBuilder);
    toastr = inject(ToastrService);
    loginService = inject(LoginService);

    constructor() {
        this.validateSignUpForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            repassword: ['', [Validators.required]],
            isLogin: true
        });
    }

    ngOnInit() { }
    signUp(): void {
        if (this.validateSignUpForm.valid && this.validateSignUpForm.value.password === this.validateSignUpForm.value.repassword) {
            const userList = this.loginService.getUserList();
            userList.push(this.validateSignUpForm.value);
            localStorage.setItem(LS_USER_COOKIE, JSON.stringify(userList));
            this.toastr.success('Kayıt Başarılı !!');
            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 700);
        } else {
            this.toastr.error('Parolalar uyuşmuyor !!');
        }
    }
}