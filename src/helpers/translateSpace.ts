export const translateSpace = (space: string): string => {
    switch (space) {
        case 'kitchen':
            return "Cocina";
        case 'clothes':
            return "Ropas";
        case 'bathRoomWithShower':
            return "Baño (con ducha)"
        case 'socialBathRoomWithoutShower':
            return "Baño social (sin ducha)"
        case 'study':
            return "Estudio"
        case 'diningRoom':
            return "Sala comedor"
        case 'hall':
            return "Hall"
        case 'terraceYard':
            return "Terraza / Patio"
        case 'balcony':
            return "Balcón"
        case 'bedRoom':
            return "Habitación"
        default:
            break;
    }

    return space
}