import { Injectable } from '@angular/core';

declare var swire: any;

@Injectable({
  providedIn: 'root'
})
export class MissingValuesService {
  filterNotMissing(varsData: number[][]): number[][] {
    var filteredValues: number[][] = [];

    const smallestMissingValue = swire.getMissingValue();

    var missingValueIndexesSet = new Set();
    varsData.forEach(varData => {
      var varMissingValueIndexes = varData
        .map((x, i) => x >= smallestMissingValue ? i : null)
        .filter(x => x != null);
      varMissingValueIndexes.forEach(x => missingValueIndexesSet.add(x));
    });
    
    varsData.forEach(v =>
      filteredValues.push(v.filter((x, i) => !missingValueIndexesSet.has(i))));

    return filteredValues;
  }
}
