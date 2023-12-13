import { useState } from 'react';

type Quotation = {
    sellerName: string;
    quoteName: string;
    apartmentType: string;
    projectName: string;
    typology: string;
    styleCatalog: string;
    date: string;
    price: number;
};

const useLocalStorage = (key: string, initialValue: Quotation) => {
    // Obtener el valor almacenado en el localStorage o el valor inicial
    const storedValue = JSON.parse(localStorage.getItem(key) || 'null') as Quotation || initialValue;

    // Estado para el valor actual
    const [value, setValue] = useState<Quotation>(storedValue);

    // Función para actualizar el valor y almacenarlo en el localStorage
    const updateValue = (newValue: Quotation) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, updateValue] as const;
};

export default useLocalStorage;
