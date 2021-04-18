import { QUADRANT_INDEXES } from './constants.js';

export class Cell {
  readonly value: number;
  readonly index: number;
  readonly systemGenerated: boolean;

  constructor(value: number, index: number, systemGenerated: boolean = true) {
    this.value = value;
    this.index = index;
    this.systemGenerated = systemGenerated;
  }

  get quadrant() {
    return QUADRANT_INDEXES.find((quadrant) => quadrant.includes(this.index));
  }
}
