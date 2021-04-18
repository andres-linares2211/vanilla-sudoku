import { Finder } from './Finder.js';

export class Validator {
  private finder = new Finder();

  validate(value: number, index: number, values: number[]): boolean {
    const possibleValues = this.finder.getPossibleValues(index, values);

    return possibleValues.includes(value);
  }
}
