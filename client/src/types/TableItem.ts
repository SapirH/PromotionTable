import { Promotion } from './promotion';

export interface TableItem {
    columns: Column[];
    items: Promotion[];
    classes: Object;
}
export interface Column { 
    label: string, 
    name: string 
}


