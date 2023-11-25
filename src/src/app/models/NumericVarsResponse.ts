import { NumericVarsInnerResponse } from "./NumericVarsInnerResponse";

export interface NumericVarsResponse {
    status: string,
    output: NumericVarsInnerResponse[];
}