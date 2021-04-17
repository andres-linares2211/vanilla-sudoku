import { Judge } from './Judge.js';

export class BoardGenerator {
  private numbers: number[] = [];
  private judge: Judge = new Judge();

  generateBoard() {
    let invalidGame = true;
    let count = 0;

    const initialTime = performance.now();

    while (invalidGame) {
      this.numbers = [];
      const countsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      let currentRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let i = 0; i < 9 * 9; i++) {
        if (i % 9 === 0) currentRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        let randomNumber = Math.floor(Math.random() * 9) + 1;
        while (countsArray[randomNumber - 1] >= 9 || currentRow[randomNumber - 1] === 1) {
          randomNumber = Math.floor(Math.random() * 9) + 1;
        }

        countsArray[randomNumber - 1] += 1;
        currentRow[randomNumber - 1] += 1;

        this.numbers.push(randomNumber);
      }

      invalidGame = !this.judge.isValidGame(this.numbers);
      count++;

      if (count > 99999) break;
    }

    const finalTime = performance.now();
    console.log(`Board generated in ${(finalTime / 1000).toFixed(2)}s`);

    console.log({ invalidGame, count });

    return this.numbers;
  }
}
