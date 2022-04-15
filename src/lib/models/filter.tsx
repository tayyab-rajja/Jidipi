
export interface FilterItem {
    label: string; // The label of the filter item
    count?: number; // Optional, count of child items in the filter item
    value?: string |number; // The value of the filter item
    min?: number; // Optional, min value
    max?: number; // Optional, max value
    icon?: string; // Optional, icon name or icon path of filter item
}
