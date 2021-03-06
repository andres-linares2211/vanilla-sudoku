import { Cell } from './Cell';
import { QUADRANT_INDEXES } from './constants';

export class Judge {
  isValidGame(cells: Cell[]): boolean {
    if (cells.length !== 9 * 9) return false;
    if (!cells.every(({ value }) => value && value >= 1 && value <= 9)) return false;
    if (!this.validAmountOfValues(cells)) return false;
    if (!this.validRows(cells)) return false;
    if (!this.validColumns(cells)) return false;
    if (!this.validQuadrants(cells)) return false;

    return true;
  }

  private validRows(cells: Cell[]): boolean {
    const row1 = cells.filter((cell) => cell.index >= 0 && cell.index < 9);
    const row2 = cells.filter((cell) => cell.index >= 9 && cell.index < 18);
    const row3 = cells.filter((cell) => cell.index >= 18 && cell.index < 27);
    const row4 = cells.filter((cell) => cell.index >= 27 && cell.index < 36);
    const row5 = cells.filter((cell) => cell.index >= 36 && cell.index < 45);
    const row6 = cells.filter((cell) => cell.index >= 45 && cell.index < 54);
    const row7 = cells.filter((cell) => cell.index >= 54 && cell.index < 63);
    const row8 = cells.filter((cell) => cell.index >= 63 && cell.index < 72);
    const row9 = cells.filter((cell) => cell.index >= 72 && cell.index < 81);

    const validRow1 = this.allAreDifferent(row1);
    const validRow2 = this.allAreDifferent(row2);
    const validRow3 = this.allAreDifferent(row3);
    const validRow4 = this.allAreDifferent(row4);
    const validRow5 = this.allAreDifferent(row5);
    const validRow6 = this.allAreDifferent(row6);
    const validRow7 = this.allAreDifferent(row7);
    const validRow8 = this.allAreDifferent(row8);
    const validRow9 = this.allAreDifferent(row9);

    return (
      validRow1 &&
      validRow2 &&
      validRow3 &&
      validRow4 &&
      validRow5 &&
      validRow6 &&
      validRow7 &&
      validRow8 &&
      validRow9
    );
  }

  private validColumns(cells: Cell[]): boolean {
    const column1 = cells.filter(({ index }) => index % 9 === 0);
    const column2 = cells.filter(({ index }) => index % 9 === 1);
    const column3 = cells.filter(({ index }) => index % 9 === 2);
    const column4 = cells.filter(({ index }) => index % 9 === 3);
    const column5 = cells.filter(({ index }) => index % 9 === 4);
    const column6 = cells.filter(({ index }) => index % 9 === 5);
    const column7 = cells.filter(({ index }) => index % 9 === 6);
    const column8 = cells.filter(({ index }) => index % 9 === 7);
    const column9 = cells.filter(({ index }) => index % 9 === 8);

    const validColumn1 = this.allAreDifferent(column1);
    const validColumn2 = this.allAreDifferent(column2);
    const validColumn3 = this.allAreDifferent(column3);
    const validColumn4 = this.allAreDifferent(column4);
    const validColumn5 = this.allAreDifferent(column5);
    const validColumn6 = this.allAreDifferent(column6);
    const validColumn7 = this.allAreDifferent(column7);
    const validColumn8 = this.allAreDifferent(column8);
    const validColumn9 = this.allAreDifferent(column9);

    return (
      validColumn1 &&
      validColumn2 &&
      validColumn3 &&
      validColumn4 &&
      validColumn5 &&
      validColumn6 &&
      validColumn7 &&
      validColumn8 &&
      validColumn9
    );
  }

  private validQuadrants(cells: Cell[]) {
    const [
      quadrant1,
      quadrant2,
      quadrant3,
      quadrant4,
      quadrant5,
      quadrant6,
      quadrant7,
      quadrant8,
      quadrant9,
    ] = QUADRANT_INDEXES.map((quadrant) => quadrant.map((index) => cells[index]));

    const validQuadrant1 = this.allAreDifferent(quadrant1);
    const validQuadrant2 = this.allAreDifferent(quadrant2);
    const validQuadrant3 = this.allAreDifferent(quadrant3);
    const validQuadrant4 = this.allAreDifferent(quadrant4);
    const validQuadrant5 = this.allAreDifferent(quadrant5);
    const validQuadrant6 = this.allAreDifferent(quadrant6);
    const validQuadrant7 = this.allAreDifferent(quadrant7);
    const validQuadrant8 = this.allAreDifferent(quadrant8);
    const validQuadrant9 = this.allAreDifferent(quadrant9);

    return (
      validQuadrant1 &&
      validQuadrant2 &&
      validQuadrant3 &&
      validQuadrant4 &&
      validQuadrant5 &&
      validQuadrant6 &&
      validQuadrant7 &&
      validQuadrant8 &&
      validQuadrant9
    );
  }

  private validAmountOfValues(values: Cell[]) {
    const countsArray = values.reduce(
      (acc, { value }) => {
        acc[(value || 0) - 1]++;
        return acc;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    return countsArray.every((count) => count === 9);
  }

  private allAreDifferent(values: Cell[]) {
    if (values.length !== 9) throw new Error('Invalid check');

    const onlyFilledValues = values.filter(({ value }) => !!value);
    const uniqueArray = [...new Set(onlyFilledValues)];

    return onlyFilledValues.length === uniqueArray.length;
  }
}
