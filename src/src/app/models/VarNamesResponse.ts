import { VarNamesInnerResponse } from "./VarNamesInnerResponse";
    
export interface VarNamesResponse {
    status: string,
    output: VarNamesInnerResponse[];
}