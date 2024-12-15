import { Component, Input, OnInit, ViewEncapsulation, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AutocompleteOptionGroups } from '../../core/interfaces/cities.interface';



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

    @Input() type: string = '';  // Bileşen tipini alacak

    selectedValue: string | null = null;
    optionGroups: AutocompleteOptionGroups[] = [];
    searchValue: string = '';  // Kullanıcı arama terimi
    filteredOptions: string[] = []; // aranan kelimeye göre gelen değer
    inputValue?: string;  // kullanıcının girdiği değer
    filteredCities: string[] = []; // kullanıcı arama yaptığıda filtrelenecek şehirler

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


    // ControlValueAccessor için gerekli metotlar
    onChange: any = () => { };
    onTouch: any = () => { };
    ngOnInit(): void {
        if (this.type === 'countryCity') {
            this.optionGroups = this.getCountryCityGroups();
        }
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
                return 'Select Unit 1';
            case 'unit2':
                return 'Select Unit 2';
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

    getCountryCityGroups(): AutocompleteOptionGroups[] {
        return Object.keys(this.countriesCities).map((country: string) => ({
            title: country,
            children: this.countriesCities[country].map((city: string) => ({ title: city }))
        }));
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
            })).filter(group => group.children.length > 0);  // eğer o ülkenin şehri kalmazsa o grup silinir
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
        this.onTouch(value);
    }
}
