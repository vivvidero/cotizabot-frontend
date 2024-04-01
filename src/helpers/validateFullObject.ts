/**
 * Valida si un objeto tiene todos sus valores definidos y no son cadenas vacías.
 * @param object Objeto a validar.
 * @returns true si el objeto tiene todos sus valores definidos y no son cadenas vacías, false de lo contrario.
 */

interface Objeto {
    [key: string]: any;
}

export function validateFullObject(object: Objeto): boolean {
    // Iterar sobre las claves del objeto
    for (let key in object) {
        // Verificar si el valor es undefined o una cadena vacía
        if (object[key] === undefined || object[key] === '') {
            // Si encuentra una clave con valor undefined o cadena vacía, retorna false
            return false;
        }
    }
    // Si ninguna clave tiene valor undefined o cadena vacía, retorna true
    return true;
}