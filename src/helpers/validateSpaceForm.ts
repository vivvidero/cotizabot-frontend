import { SingleSpace } from "../types/Spaces";

export const validateSpaceForm = (space: SingleSpace) => {

    let isComplete;

    if (space.spacetype === 'kitchen') {
        isComplete = !space.area || !space.spacetypology || !space.demolitions || !space.walls || !space.lowercabinetml || !space.cubboard || !space.islandorbar ? false : true
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

    console.log(isComplete);


    return isComplete
}