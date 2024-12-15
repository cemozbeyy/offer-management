import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DropdownComponent } from '../../shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { Dimension } from '../../core/interfaces/offer-detail.interface';

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

    // Dummy dimensions
    dimensions = {
        'Carton': { width: 12, length: 12, height: 12 },
        'Box': { width: 24, length: 16, height: 12 },
        'Pallet': { width: 40, length: 48, height: 60 }
    };

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

    // Calculate Boxes
    calculateBoxes(cartonDimensions: Dimension, boxDimensions: Dimension): number {
        return Math.floor(boxDimensions.width / cartonDimensions.width) *
            Math.floor(boxDimensions.length / cartonDimensions.length) *
            Math.floor(boxDimensions.height / cartonDimensions.height);
    }

    // Calculate Pallets
    calculatePallets(boxDimensions: Dimension, palletDimensions: Dimension): number {
        return Math.floor(palletDimensions.width / boxDimensions.width) *
            Math.floor(palletDimensions.length / boxDimensions.length) *
            Math.floor(palletDimensions.height / boxDimensions.height);
    }

    // convert Inches to Centimeters
    inchesToCm(inches: number): number {
        return inches * 2.54;
    }

    // paund to kg 
    lbsToKg(lbs: number): number {
        return lbs * 0.453592;
    }

    // Kaydetme ve hesaplama işlemi
    onSave(): void {
        const isAnyFieldEmpty = Object.values(this.form.value).some(value => value === '' || value === null);

        if (this.form.valid && !isAnyFieldEmpty) {
            const formData = this.form.value;

            let boxCount = 0;
            let palletCount = 0;

            const unit1 = formData.unit1;
            const unit2 = formData.unit2;

            // paket tipi carton ise kutu ve palet hesapla
            if (formData.packageType === 'Cartons') {
                const cartonDimensions = this.dimensions['Carton'];
                const boxDimensions = this.dimensions['Box'];
                boxCount = this.calculateBoxes(cartonDimensions, boxDimensions);

                const palletDimensions = this.dimensions['Pallet'];
                palletCount = this.calculatePallets(boxDimensions, palletDimensions);
            } else if (formData.packageType === 'Boxes') {
                const boxDimensions = this.dimensions['Box'];
                const palletDimensions = this.dimensions['Pallet'];
                palletCount = this.calculatePallets(boxDimensions, palletDimensions);
            }

            // Mode kontrolü
            if (formData.mode === 'LCL' && palletCount >= 24) {
                this.toastr.error('FCL seçmelisiniz, çünkü palet sayısı 24\'ten büyük.');
                return;
            } else if (formData.mode === 'FCL' && palletCount > 24) {
                this.toastr.error('FCL ile 24\'ten fazla palet gönderilemez.');
                return;
            }

            // Başarılı işlem
            this.router.navigate(['/offer/offer-list'], { state: { offerData: formData } });
            this.toastr.success('Veriler başarıyla kaydedildi.');
        } else {
            // Form geçersizse hata mesajı
            this.toastr.error('Bütün veriler eksiksiz girilmelidir !!');
        }
    }

}
