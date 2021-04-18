import { BoardGenerator } from './BoardGenerator.js';

export class Board {
  private numbers: (number | null)[] = [];
  private currentNumbers: (number | null)[] = [];

  initialize() {
    this.numbers = new BoardGenerator().generateBoard();
    this.currentNumbers = [...this.numbers];
  }

  setValue(index: number, value: number | null) {
    this.currentNumbers[index] = value;
  }

  get initialValues() {
    return this.numbers;
  }

  get currentValues() {
    return this.currentNumbers;
  }
}
