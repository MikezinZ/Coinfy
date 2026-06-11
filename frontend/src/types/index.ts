export interface Category {
    id: number;
    name: string;
    icon?: string;
}

export interface Transaction {
    id: number;
    category: number;
    category_name: string;
    description: string;
    amount: string;
    date: string;
    type: 'INCOME' | 'EXPENSE' | 'INVESTIMENT';
    created_at?: string;
}

export interface Budget {
    id: number;
    category: number;
    category_name: string;
    amount: string;
    month: number;
    year: number;
}

export interface RecurringExpense {
    id: number;
    category: number;
    category_name: string;
    description: string;
    amount: string;
    frequency: 'MONTHLY' | 'YEARLY';
    start_date: string;
    is_active: boolean;
}