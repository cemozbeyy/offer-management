import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DropdownComponent } from '../../shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
    selector: 'offer-page-component',
    templateUrl: './offer-page.component.html',
    styleUrls: ['./offer-page.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NzButtonModule, DropdownComponent]
})
export class OfferPageComponent implements OnInit {
    form: FormGroup;
    toastr = inject(ToastrService);
    router = inject(Router);

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            mode: [''],
            movementType: [''],
            incoterms: [''],
            countryCity: [''],
            packageType: [''],
            unit1: [''],
            unit2: [''],
            currency: ['']
        });
    }

    ngOnInit(): void { }

    onSave(): void {
        if (this.form.valid) {
            const formData = this.form.value;
            console.log('Form Data:', formData);
            this.router.navigate(['/offer/offer-list'])
            this.toastr.success('Veriler başarıyla kaydedildi.');
        } else {
            this.toastr.error('Bütün veriler eksiksiz girilmelidir !!');
        }
    }
}
