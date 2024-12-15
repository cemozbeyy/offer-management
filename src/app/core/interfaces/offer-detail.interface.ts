import { FormControl } from "@angular/forms";

export interface Dimension {
  width: number;
  length: number;
  height: number;
}
export interface Offer {
  mode: FormControl<string | null>;
  movementType: FormControl<string | null>;
  incoterms: FormControl<string | null>;
  countryCity: FormControl<string | null>;
  packageType: FormControl<string | null>;
  unit1: FormControl<string | null>;
  unit2: FormControl<string | null>;
  currency: FormControl<string | null>;
}
export interface DropdownOption {
  value: string;  // Seçenek değeri
  label: string;  // Görünen etiket
}