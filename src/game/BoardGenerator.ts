import { QUADRANT_INDEXES } from './constants.js';
import { Finder } from './Finder.js';
import { Judge } from './Judge.js';

export class BoardGenerator {
  private values: number[] = [];
  private judge: Judge = new Judge();

  generateBoard() {
    let invalidGame = true;
    const initialTime = performance.now();

    while (invalidGame) {
      this.values = [];

      for (let i = 0; i < 9 * 9; i++) {
        const possibleNumbers = new Finder().getPossibleValues(i, this.values);

        if (performance.now() - initialTime > 100) {
          break;
        }

        if (possibleNumbers.length === 0) {
          const restartRowGeneration = () => {
            i = Math.floor(i / 9) * 9 - 1;
            this.values = this.values.splice(0, i + 1);
          };

          restartRowGeneration();
          continue;
        }

        const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
        this.values.push(possibleNumbers[randomIndex]);
      }

      invalidGame = !this.judge.isValidGame(this.values);
      if (performance.now() - initialTime > 10000) break;
    }

    return this.values;
  }
}
