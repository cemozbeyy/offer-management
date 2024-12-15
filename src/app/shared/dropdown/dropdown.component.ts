import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@Component({
    selector: 'dropdown-component',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ],
    imports: [CommonModule, ReactiveFormsModule, NzSelectModule, FormsModule, NzAutocompleteModule]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
    @Input() type: string = '';  // Bileşen tipini alacak
    selectedValue: string | null = null;
    searchValue: string = '';  // Kullanıcı arama terimi
    // Seçenekler START
    modes = ['LCL', 'FCL', 'Air'];
    movementTypes = ['Door to Door', 'Port to Door', 'Door to Port', 'Port to Port'];
    incoterms = ['Delivered Duty Paid (DDP)', 'Delivered At Place (DAT)'];
    countriesCities: any = {
        'USA': ['New York', 'Los Angeles', 'Miami', 'Minnesota'],
        'China': ['Beijing', 'Shanghai'],
        'Turkey': ['Istanbul', 'Izmir']
    };
    packageTypes = ['Pallets', 'Boxes', 'Cartons'];
    units1 = ['CM', 'IN'];
    units2 = ['KG', 'LB'];
    currencies = [
        { value: 'USD', label: 'US Dollar' },
        { value: 'CNY', label: 'Chinese Yuan' },
        { value: 'TRY', label: 'Turkish Lira' }
    ];
    // Seçenekler END
    filteredOptions: string[] = []; // aranan kelimeye göre gelen değer
    inputValue?: string;  // Kullanıcının girdiği değer

    // ControlValueAccessor için gerekli metotlar
    onChange: any = () => { };
    onTouch: any = () => { };

    ngOnInit() {
        this.filteredOptions = this.getAllCities();
    }

    // type'a göre doğru listeyi döndürür
    getOptions() {
        switch (this.type) {
            case 'mode':
                return this.modes;
            case 'movementType':
                return this.movementTypes;
            case 'incoterms':
                return this.incoterms;
            case 'countryCity':
                return Object.keys(this.countriesCities);  // Ülkeleri döndürür
            case 'packageType':
                return this.packageTypes;
            case 'unit1':
                return this.units1;
            case 'unit2':
                return this.units2;
            case 'currency':
                return this.currencies.map(item => item.label);
            default:
                return [];
        }
    }

    // type'a göre placeholder döndürür
    getPlaceholder() {
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
                return 'Select Unit (Length)';
            case 'unit2':
                return 'Select Unit (Weight)';
            case 'currency':
                return 'Select Currency';
            default:
                return 'Select an option';
        }
    }

    onChangeInput(value: string): void {
        const lowerCaseValue = value.toLowerCase();
        this.filteredOptions = this.getAllCities().filter(city => city.toLowerCase().includes(lowerCaseValue));
        this.onChange(value);
        this.onTouch(value);
    }

    getAllCities(): string[] {
        let allCities: string[] = [];
        (Object.values(this.countriesCities) as string[][]).forEach(cities => {
            allCities = [...allCities, ...cities];
        });
        return allCities;
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
        this.onTouch(value);
    }
}
