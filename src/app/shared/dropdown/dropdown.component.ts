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
  selector: 'dropdown-component',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  imports: [FormsModule, NzAutocompleteModule, NzIconModule, NzInputModule, CommonModule, ReactiveFormsModule, NzSelectModule]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: DropdownOptions = [];
  @Input() type: 'mode' | 'movementType' | 'incoterms' | 'packageType' | 'unit1' | 'unit2' | 'currency' | 'countryCity' = 'mode';

  selectedValue: string | null = null;
  optionGroups: AutocompleteOptionGroups[] = [];
  filteredOptions: string[] = []; // aranan kelimeye göre gelen değer
  inputValue?: string; // kullanıcının girdiği değer
  filteredCities: string[] = []; // kullanıcı arama yaptığıda filtrelenecek şehirler

  onChange: (value: string) => void = () => { };
  onTouch: () => void = () => { };

  ngOnInit(): void {

  }

  getOptions(): DropdownOptionObject[] {
    if (this.type === 'currency' && Array.isArray(this.options)) {
      return this.options as DropdownOptionObject[];
    }
    if (this.type === 'countryCity') {
      return Object.keys(this.options as Record<string, string[]>).map(key => ({ value: key, label: key }));
    }
    return this.options as DropdownOptionObject[];
  }

  getPlaceholder(): string {
    switch (this.type) {
      case 'mode':
        return 'Select Mode';
      case 'movementType':
        return 'Select Movement Type';
      case 'incoterms':
        return 'Select Incoterms';
      case 'packageType':
        return 'Select Package Type';
      case 'unit1':
        return 'Select Unit 1';
      case 'unit2':
        return 'Select Unit 2';
      case 'currency':
        return 'Select Currency';
      default:
        return 'Select an option';
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

  isDropdownOptionObject(option: DropdownOption): option is DropdownOptionObject {
    return typeof option === 'object' && 'value' in option;
  }
}
