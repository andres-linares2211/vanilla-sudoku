import { Cell } from './Cell';
import { QUADRANT_INDEXES } from './constants';

/**
 * The finder object will return the possible combinations for a given position
 */
export class Finder {
  getPossibleValues(index: number, cells: Cell[]): number[] {
    const availableValuesInRow = this.availableValuesInRow(index, cells);
    const availableValuesInColumn = this.availableValuesInColumn(index, cells);
    const availableValuesInQuadrant = this.availableValuesInQuadrant(index, cells);

    const intersection = (arr1: number[], arr2: number[]) => arr1.filter((v) => arr2.includes(v));

    const possibleInRowAndColumn = intersection(availableValuesInRow, availableValuesInColumn);
    const possibleAllThree = intersection(possibleInRowAndColumn, availableValuesInQuadrant);

    return possibleAllThree;
  }

  private availableValuesInQuadrant(index: number, cells: Cell[]): number[] {
    const currentQuadrant = QUADRANT_INDEXES.find((quadrant) => quadrant.includes(index));
    let cellsInQuadrant = currentQuadrant?.map((index) =>
      cells.find((cell) => cell.index === index)
    ) as Cell[];
    cellsInQuadrant = cellsInQuadrant.filter((cell) => cell?.index !== index);

    return this.getAvailableNumbers(cellsInQuadrant);
  }

  private availableValuesInColumn(index: number, cells: Cell[]): number[] {
    const firstIndexInColumn = index % 9;
    let cellsInColumn = cells.filter((cell) => cell.index % 9 === firstIndexInColumn);
    cellsInColumn = cellsInColumn.filter((cell) => cell.index !== index);

    return this.getAvailableNumbers(cellsInColumn);
  }

  private availableValuesInRow(index: number, cells: Cell[]): number[] {
    const currentRow = Math.floor(index / 9);
    const firstIndexInRow = currentRow * 9;
    let cellsInRow = cells.filter(
      (cell) => cell.index >= firstIndexInRow && cell.index < firstIndexInRow + 9
    );
    cellsInRow = cellsInRow.filter((cell) => cell.index !== index);

    return this.getAvailableNumbers(cellsInRow);
  }

  private getAvailableNumbers(usedCells: Cell[]): number[] {
    const availableNumbers = [];
    const usedValues = usedCells.map((cell) => cell?.value);

    for (let i = 1; i <= 9; i++) {
      if (!usedValues.includes(i)) availableNumbers.push(i);
    }

    return availableNumbers;
  }
}
