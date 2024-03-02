export const compararPorNumeroDeId = (a, b) => {
    const numeroIdA = a.id;
    const numeroIdB = b.id;

    // Compara los números de los IDs
    return numeroIdA - numeroIdB;
};