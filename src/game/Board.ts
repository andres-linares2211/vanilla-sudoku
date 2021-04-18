import { BoardGenerator } from './BoardGenerator.js';

export class Board {
  private numbers: (number | null)[] = [];

  initialize() {
    this.numbers = new BoardGenerator().generateBoard();
  }

  get values() {
    return this.numbers;
  }
}
