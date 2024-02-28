import { useState } from 'react';

// Custom hook para manejar el localStorage
const UseLocalStorage = (key, initialValue) => {
    // Obtener el valor almacenado en localStorage, o usar el initialValue si no existe
    const storedValue = localStorage.getItem(key);
    const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

    // Función para actualizar el valor en localStorage y en el estado
    const updateValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    // Función para eliminar el valor del localStorage y del estado
    const removeValue = () => {
        setValue(null);
        localStorage.removeItem(key);
    };

    return [value, updateValue, removeValue];
};

export default UseLocalStorage;
