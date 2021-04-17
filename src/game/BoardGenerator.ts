import { Judge } from './Judge.js';

export class BoardGenerator {
  private values: number[] = [];
  private judge: Judge = new Judge();

  generateBoard() {
    let invalidGame = true;
    let count = 0;

    const initialTime = performance.now();

    while (invalidGame) {
      this.values = [];

      for (let i = 0; i < 9 * 9; i++) {
        const availableNumbersInRow = this.availableNumbersInRow(i);
        const availableNumbersInColumn = this.availableNumbersInColumn(i);
        const allAvailableNumbers = [...availableNumbersInRow, ...availableNumbersInColumn];
        const possibleNumbers = [];

        for (let value of allAvailableNumbers) {
          if (allAvailableNumbers.filter((number) => number === value).length === 2) {
            possibleNumbers.push(value);
          }
        }

        if (possibleNumbers.length === 0) {
          i = Math.floor(i / 9) * 9 - 1;
          this.values = this.values.splice(0, i + 1);
          continue;
        }

        const randomIndex = Math.floor(Math.random() * possibleNumbers.length);

        this.values.push(possibleNumbers[randomIndex]);
      }

      invalidGame = !this.judge.isValidGame(this.values);
      count++;

      if (count > 9999) break;
    }

    const finalTime = performance.now();
    console.log(`Board generated in ${((finalTime - initialTime) / 1000).toFixed(2)}s`);

    console.log({ invalidGame, count });

    return this.values;
  }

  private availableNumbersInColumn(index: number): number[] {
    const firstIndexInColumn = index % 9;
    const numbersInColumn = this.values.filter((_, index) => index % 9 === firstIndexInColumn);
    const availableNumbers = [];

    for (let i = 1; i <= 9; i++) {
      if (!numbersInColumn.includes(i)) availableNumbers.push(i);
    }

    return availableNumbers;
  }

  private availableNumbersInRow(index: number): number[] {
    const currentRow = Math.floor(index / 9);
    const firstIndexInRow = currentRow * 9;
    const numbersInRow = this.values.slice(firstIndexInRow, firstIndexInRow + 9);
    const availableNumbers = [];

    for (let i = 1; i <= 9; i++) {
      if (!numbersInRow.includes(i)) availableNumbers.push(i);
    }

    return availableNumbers;
  }
}
