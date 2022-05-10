export const GET_INPUT = "GET_INPUT";

export type searchInput = {
    search_string: string
    price: number
    country:string
    page: number
    lowToHigh: boolean
}


export interface GET_INPUT {
    type: typeof GET_INPUT
    payload: any

}

export type searchDispatchTypes = GET_INPUT

