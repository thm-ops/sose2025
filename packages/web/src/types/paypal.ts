// src/types/paypal.ts
export interface PayPalAmount {
    currency_code: string;
    value: string;
}

export interface PayPalItem {
    name: string;
    unit_amount: PayPalAmount;
    quantity: string;
    description?: string;
    sku?: string;
}

export interface PayPalPurchaseUnit {
    amount: PayPalAmount;
    items?: PayPalItem[];
}

export interface PayPalPayer {
    name?: {
        given_name?: string;
        surname?: string;
    };
    email_address?: string;
}

export interface PayPalOrder {
    id: string;
    status: string;
    purchase_units: PayPalPurchaseUnit[];
    payer?: PayPalPayer;
    create_time?: string;
    update_time?: string;
}
