import { QUADRANT_INDEXES } from './constants';

export class Cell {
  readonly index: number;
  private _value: number | null;
  private _manipulated = false;
  error = false;

  constructor(value: number | null, index: number) {
    this._value = value;
    this.index = index;
  }

  resetManipulation() {
    this._manipulated = false;
  }

  get quadrant() {
    return QUADRANT_INDEXES.find((quadrant) => quadrant.includes(this.index));
  }

  get manipulated() {
    return this._manipulated;
  }

  get value() {
    return this._value;
  }

  set value(value: number | null) {
    if (value !== null && (value < 1 || value > 9)) return;

    this._value = value;
    this._manipulated = true;
  }
}
