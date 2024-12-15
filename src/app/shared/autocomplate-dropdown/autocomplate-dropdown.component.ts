import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AutocompleteOptionGroups } from '../../core/interfaces/cities.interface';

interface DropdownOptionObject {
  value: string;
  label: string;
}

export type DropdownOption = string | DropdownOptionObject;
export type DropdownOptions = DropdownOption[] | Record<string, string[]>;

@Component({
  standalone: true,
  selector: 'autocomplate-dropdown-component',
  templateUrl: './autocomplate-dropdown.component.html',
  styleUrls: ['./autocomplate-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoComplateDropdownComponent),
      multi: true
    }
  ],
  imports: [FormsModule, NzAutocompleteModule, NzIconModule, NzInputModule, CommonModule, ReactiveFormsModule, NzSelectModule]
})
export class AutoComplateDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: DropdownOptions = [];
  @Input() type = 'countryCity';

  selectedValue: string | null = null;
  optionGroups: AutocompleteOptionGroups[] = [];
  filteredOptions: string[] = []; // aranan kelimeye göre gelen değer
  inputValue?: string; // kullanıcının girdiği değer


  onChange: (value: any) => void = () => { };
  onTouch: () => void = () => { };

  ngOnInit(): void {
    if (this.type === 'countryCity') {
      this.optionGroups = this.getCountryCityGroups();
    }
  }



  onChangeInput(value: string): void {
    const lowerCaseValue = value.toLowerCase();
    this.filteredOptions = this.getAllCities().filter(city => city.toLowerCase().includes(lowerCaseValue));
    this.onChange(value);
    this.onTouch();
  }

  getAllCities(): string[] {
    const countryCityMap = this.options as Record<string, string[]>;
    return Object.values(countryCityMap).flat(); // başlıkları çıkarıp şehirleri al
  }

  getCountryCityGroups(): AutocompleteOptionGroups[] {
    const countryCityMap = this.options as Record<string, string[]>;
    return Object.keys(countryCityMap).map((country: string) => {
      const cities = countryCityMap[country];
      return {
        title: country,
        children: Array.isArray(cities) ? cities.map((city: string) => ({ title: city })) : []
      };
    });
  }

  // input değeri değiştiğinde şehirleri filtrele ve optionGroupsu güncelle
  onSearch(value: string): void {
    if (value) {
      // her ülkenin şehirlerini filtrele
      this.optionGroups = this.getCountryCityGroups().map(group => ({
        ...group,
        children: group.children!.filter(option =>
          option.title.toLowerCase().includes(value.toLowerCase()) // şehir ismi filtreleme
        )
      })).filter(group => group.children.length > 0); // eğer o ülkenin şehri kalmazsa o grup silinir
    } else {
      // eğer input boşsa, tüm gruplar geri yükle
      this.optionGroups = this.getCountryCityGroups();
    }
  }

  // ControlValueAccessor metotları
  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onSelectChange(value: string): void {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouch();
  }
}
