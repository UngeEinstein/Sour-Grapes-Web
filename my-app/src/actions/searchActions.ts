import {Dispatch} from "redux";
import {GET_INPUT, searchDispatchTypes} from "./searchActionTypes"

export const GetInput = (searchString: string, price:number, country: string, page:number, lowToHigh:boolean) => (dispatch: Dispatch<searchDispatchTypes>) => {
    try {
        dispatch({
            type: GET_INPUT,
            payload: {searchString: searchString, price:price, country:country, page:page, lowToHigh:lowToHigh}
        })
    } catch (e) {

    }

};