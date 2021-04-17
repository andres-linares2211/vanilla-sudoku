import { Judge } from './Judge.js';

export class BoardGenerator {
  private numbers: number[] = [];
  private judge: Judge = new Judge();

  generateBoard() {
    let invalidGame = true;
    let count = 0;

    while (invalidGame) {
      this.numbers = [];
      for (let i = 0; i < 9 * 9; i++) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        this.numbers.push(randomNumber);
      }

      invalidGame = !this.judge.isValidGame(this.numbers);
      count++;

      if (count > 99999) break;
    }

    console.log({ invalidGame });

    return this.numbers;
  }
}
