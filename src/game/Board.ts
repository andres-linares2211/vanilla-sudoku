import { BoardGenerator } from './BoardGenerator.js';

export class Board {
  private numbers: number[] = [];

  initialize() {
    this.numbers = new BoardGenerator().generateBoard();
  }

  get values() {
    return Object.freeze(this.numbers);
  }
}