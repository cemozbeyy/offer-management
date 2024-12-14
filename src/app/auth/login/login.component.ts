import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToastrService } from 'ngx-toastr';

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

    private fb = inject(FormBuilder);
    toastr = inject(ToastrService);
    constructor() {
        this.validateForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            remember: [true]
        });
    }

    ngOnInit(): void { }

    submit(): void {
        if (this.validateForm.valid) {
            console.log('submit', this.validateForm.value);
            // this.toastr.error("Hatalı Giriş !!")
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
