import { Owner } from "./owner";

export interface Repository {
    id : number,
    html_url : string,
    full_name : string,
    name : string
    description : string,
    owner : Owner,
}