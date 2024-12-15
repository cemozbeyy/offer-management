import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { Dimension, Offer } from '../../core/interfaces/offer-detail.interface';
import { DimensionRecord } from '../../core/types';
import { DropdownComponent } from '../../shared';
import { AutoComplateDropdownComponent } from '../../shared/autocomplate-dropdown/autocomplate-dropdown.component';

type ModeOptions = 'LCL' | 'FCL' | 'Air';
type MovementTypeOptions = 'Door to Door' | 'Port to Door' | 'Door to Port' | 'Port to Port';
type IncotermOptions = 'Delivered Duty Paid (DDP)' | 'Delivered At Place (DAT)';
type PackageTypeOptions = 'Pallets' | 'Boxes' | 'Cartons';
type UnitOptions = 'CM' | 'IN' | 'KG' | 'LB';
type CurrencyOptions = { value: string, label: string };
@Component({
  selector: 'offer-page-component',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, DropdownComponent, AutoComplateDropdownComponent]
})
export class OfferPageComponent implements OnInit {
  form: FormGroup = new FormGroup<Offer>({
    mode: new FormControl(''),
    movementType: new FormControl(''),
    incoterms: new FormControl(''),
    countryCity: new FormControl(''),
    packageType: new FormControl(''),
    unit1: new FormControl(''),
    unit2: new FormControl(''),
    currency: new FormControl(''),
  },);

  toastr = inject(ToastrService);
  router = inject(Router);

  // Dummy dimensions
  dimensions: DimensionRecord = {
    'Carton': { width: 12, length: 12, height: 12 },
    'Box': { width: 24, length: 16, height: 12 },
    'Pallet': { width: 40, length: 48, height: 60 }
  };

  //hata almak için dummy data 
  // dimensions: DimensionRecord = {
  //   'Carton': { width: 12, length: 12, height: 12 },
  //   'Box': { width: 24, length: 16, height: 12 },   
  //   'Pallet': { width: 100, length: 120, height: 100 } 
  // };

  // Seçenekler START
  modes: ModeOptions[] = ['LCL', 'FCL', 'Air'];
  movementTypes: MovementTypeOptions[] = ['Door to Door', 'Port to Door', 'Door to Port', 'Port to Port'];
  incoterms: IncotermOptions[] = ['Delivered Duty Paid (DDP)', 'Delivered At Place (DAT)'];
  countriesCities: Record<string, string[]> = {
    'USA': ['New York', 'Los Angeles', 'Miami', 'Minnesota'],
    'China': ['Beijing', 'Shanghai'],
    'Turkey': ['Istanbul', 'Izmir']
  };
  packageTypes: PackageTypeOptions[] = ['Pallets', 'Boxes', 'Cartons'];
  units1: UnitOptions[] = ['CM', 'IN'];
  units2: UnitOptions[] = ['KG', 'LB'];
  currencies: CurrencyOptions[] = [
    { value: 'USD', label: 'US Dollar' },
    { value: 'CNY', label: 'Chinese Yuan' },
    { value: 'TRY', label: 'Turkish Lira' }
  ];
  // Seçenekler END


  ngOnInit(): void {
  }

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
      let palletCount = 0;

      // paket tipi carton ise kutu ve palet hesapla
      if (formData.packageType === 'Cartons') {

        const boxDimensions = this.dimensions['Box'];

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
