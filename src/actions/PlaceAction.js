import { Types } from "./types/Place";

export const addPlace = payload => {
    console.log('Payload : ');
    console.log(payload);
    return{
        type : Types.ADD_PLACE,
        payload
    };
};

export const fetchCoordinate = coordinate => {
    console.log('Fetch coordinate');
    console.log(coordinate);
    return{
        type : Types.FETCH_COORDINATE,
        coordinate
    }
}