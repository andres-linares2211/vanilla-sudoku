import { Cell } from './Cell';
import { Finder } from './Finder';

export class Validator {
  private finder = new Finder();

  validate(value: number, index: number, cells: Cell[]): boolean {
    const possibleValues = this.finder.getPossibleValues(index, cells);

    return possibleValues.includes(value);
  }
}
