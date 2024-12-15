export interface DropdownOptionObject {
    value: string;
    label: string;
}

export type DropdownOption = string | DropdownOptionObject;
export type DropdownOptions = DropdownOption[] | Record<string, string[]>;
