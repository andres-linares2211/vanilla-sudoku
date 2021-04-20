import { QUADRANT_INDEXES } from './constants';

export class Cell {
  readonly index: number;
  private _value: number | null;
  private _manipulated = false;
  private _pencilMarks: number[] = [];
  error = false;
  autocompleted = false;

  constructor(value: number | null, index: number) {
    this._value = value;
    this.index = index;
  }

  resetManipulation(): void {
    this._manipulated = false;
  }

  addPencilMark(value: number): void {
    if (value < 1 || value > 9) return;
    if (this.pencilMarks.includes(value)) return;
    if (this._value !== null) return;

    this._pencilMarks.push(value);
  }

  removePencilMark(value: number): void {
    if (!this.pencilMarks.includes(value)) return;

    this._pencilMarks = this._pencilMarks.filter((mark) => mark !== value);
  }

  get quadrant(): number[] | undefined {
    return QUADRANT_INDEXES.find((quadrant) => quadrant.includes(this.index));
  }

  get manipulated(): boolean {
    return this._manipulated;
  }

  get pencilMarks(): number[] {
    return this._pencilMarks;
  }

  get value(): number | null {
    return this._value;
  }

  set value(value: number | null) {
    if (value !== null && (value < 1 || value > 9)) return;

    this._value = value;
    this._manipulated = true;
    this._pencilMarks = [];
  }
}
