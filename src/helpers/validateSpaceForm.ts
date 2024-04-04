import { SingleSpace } from "../types/Projects/Spaces";

/**
 * Valida si un formulario de espacio tiene todos los campos requeridos completos.
 * @param space Objeto SingleSpace que representa el espacio a validar.
 * @returns true si el formulario de espacio tiene todos los campos requeridos completos, false de lo contrario.
 */
export const validateSpaceForm = (space: SingleSpace) => {

    let isComplete;

    if (space.spacetype === 'kitchen') {
        isComplete = !space.area || !space.spacetypology || !space.lowercabinetml || !space.cubboard ? false : true
    } else if (space.spacetype === 'clothes') {
        isComplete = !space.area || !space.spacetypology || !space.slidingdoor || !space.cubboard ? false : true
    } else if (space.spacetype === 'socialBathRoomWithoutShower') {
        isComplete = !space.area || !space.bathroomfurniture || !space.veneeredwall ? false : true
    } else if (space.spacetype === "bathRoomWithShower") {
        isComplete = !space.area || !space.bathroomfurniture || !space.showerdivision || !space.ceilingr ? false : true
    } else if (space.spacetype === "bedRoom") {
        isComplete = !space.area || !space.closetml || !space.ceilingr ? false : true
    } else if (space.spacetype === "study") {
        isComplete = !space.area || !space.deskml || !space.furnituretvlibrary || !space.shelf ? false : true
    } else if (space.spacetype === "diningRoom") {
        isComplete = !space.area || !space.furnituretvlibrary ? false : true
    } else if (space.spacetype === "hall" || space.spacetype === "terraceYard" || space.spacetype === "balcony") {
        isComplete = !space.area ? false : true
    }



    return isComplete
}