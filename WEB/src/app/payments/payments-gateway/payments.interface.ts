export interface Payer {
    email: string;
    name?: string;
    surename?: string;
}


export interface Item {
    title: string;
    quantity: number;
    unit_price: string; // Almacenamos como string para coincidir con la modificación en to_representation
}

export interface Preference {
    items: Item[];
    payer?: Payer;
    back_urls: { [key: string]: string };
    auto_return: 'approved' | 'all' | 'none';
}
