import {searchDispatchTypes} from "../actions/searchActionTypes";

interface DefautltStateI{
    searchString: string,
    country: string,
    price: number,
    page: number,
    lowToHigh: boolean

}

const defaultState: DefautltStateI = {
    searchString: "",
    country: "",
    price:-1,
    page:0,
    lowToHigh: false
};

const searchReducer = (state: DefautltStateI = defaultState  , action: searchDispatchTypes) : DefautltStateI  => {
    switch(action.type){
        case 'GET_INPUT' :
            return {
            price: action.payload['price'],
            searchString: action.payload['searchString'],
            country: action.payload['country'],
            page: action.payload['page'],
            lowToHigh: action.payload['lowToHigh']}
        default:
            return state;
    }
};

export default searchReducer