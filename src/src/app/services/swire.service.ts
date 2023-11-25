import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AppConstants } from '@data/AppConstants';
import { VarNamesResponse } from '@models/VarNamesResponse';
import { NumericVarsResponse } from '@models/NumericVarsResponse';

declare var msgpack: any;
declare var swire: any;

@Injectable({
  providedIn: 'root'
})
export class SwireService {
  constructor(
    private http: HttpClient) {
  }

  getVarNames(): Observable<VarNamesResponse> {
    var request: any = {
      job: [
        {
          method: "$getVarNames"
        }
      ]
    };

    return this.sendSWireRequest<VarNamesResponse>(request);
  }

  getNumericVars(varNames: string[]): Observable<NumericVarsResponse> {
    var jobs = varNames.map(varName => {
      return {
        method: '$getNumericVar',
        args: {
          name: varName
        }
      };
    });
    var request: any = {
      job: jobs
    };

    return this.sendSWireRequest<NumericVarsResponse>(request);
  }

  private sendSWireRequest<T>(request: any): Observable<T> {
    var econdedRequest = swire.encode(request);
    return this.http.post<NumericVarsResponse>(
      AppConstants.sWireEndpoint,
      econdedRequest,
      { responseType: 'text' as 'json' }).pipe(
        map(x => swire.decode(x))
      );
  }
}
