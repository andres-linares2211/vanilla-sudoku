import { Finder } from './Finder.js';

export class Validator {
  private finder = new Finder();

  validate(value: number, index: number, values: (number | null)[]): boolean {
    console.log('hello', { value, index, values });
    const possibleValues = this.finder.getPossibleValues(index, values);

    return possibleValues.includes(value);
  }
}
