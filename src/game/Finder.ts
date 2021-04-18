import { QUADRANT_INDEXES } from './constants.js';

/**
 * The finder object will return the possible combinations for a given position
 */
export class Finder {
  getPossibleValues(index: number, values: (number | null)[]): number[] {
    const availableValuesInRow = this.availableValuesInRow(index, values);
    const availableValuesInColumn = this.availableValuesInColumn(index, values);
    const availableValuesInQuadrant = this.availableNumbersInQuadrant(index, values);

    const intersection = (arr1: number[], arr2: number[]) => arr1.filter((v) => arr2.includes(v));

    const possibleInRowAndColumn = intersection(availableValuesInRow, availableValuesInColumn);
    const possibleAllThree = intersection(possibleInRowAndColumn, availableValuesInQuadrant);

    return possibleAllThree;
  }

  private availableNumbersInQuadrant(index: number, values: (number | null)[]): number[] {
    const currentQuadrant = QUADRANT_INDEXES.find((quadrant) => quadrant.includes(index));
    const numbersInQuadrant = currentQuadrant?.map((index) => values[index]);

    return this.getAvailableNumbers(numbersInQuadrant || []);
  }

  private availableValuesInColumn(index: number, values: (number | null)[]): number[] {
    const firstIndexInColumn = index % 9;
    const numbersInColumn = values.filter((_, index) => index % 9 === firstIndexInColumn);

    return this.getAvailableNumbers(numbersInColumn);
  }

  private availableValuesInRow(index: number, values: (number | null)[]): number[] {
    const currentRow = Math.floor(index / 9);
    const firstIndexInRow = currentRow * 9;
    const numbersInRow = values.slice(firstIndexInRow, firstIndexInRow + 9);

    return this.getAvailableNumbers(numbersInRow);
  }

  private getAvailableNumbers(usedValues: (number | null)[]): number[] {
    const availableNumbers = [];

    for (let i = 1; i <= 9; i++) {
      if (!usedValues.includes(i)) availableNumbers.push(i);
    }

    return availableNumbers;
  }
}
