import { Finder } from './Finder.js';
import { Judge } from './Judge.js';
import { SmartPlayer } from './SmartPlayer.js';

export class BoardGenerator {
  private values: (number | null)[] = [];
  private finder = new Finder();
  private judge = new Judge();
  private player!: SmartPlayer;

  generateBoard() {
    const intialTime = performance.now();

    this.buildFullBoard();
    const creatingFullBoardTime = performance.now();

    this.removeValues();
    const creatingPlayableBoardTime = performance.now();

    console.log('Time building 1st board', (creatingFullBoardTime - intialTime).toFixed(2));
    console.log('Time building 2nd board', (creatingPlayableBoardTime - intialTime).toFixed(2));

    return this.values;
  }

  private removeValues() {
    let isWinnable = true;
    const maxTries = 1000;
    let count = 0;

    while (isWinnable || count < maxTries) {
      const randomIndex = Math.floor(Math.random() * this.values.length);
      if (this.values[randomIndex] === null) continue;

      const value = this.values[randomIndex];
      this.values[randomIndex] = null;

      this.player = new SmartPlayer([...this.values]);
      isWinnable = this.player.play();

      if (!isWinnable) {
        this.values[randomIndex] = value;
        count += 1;
      }
    }
  }

  private buildFullBoard() {
    let invalidGame = true;
    const initialTime = performance.now();

    while (invalidGame) {
      this.values = [];

      for (let i = 0; i < 9 * 9; i++) {
        const possibleNumbers = this.finder.getPossibleValues(i, this.values);

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
      if (performance.now() - initialTime > 1000) break;
    }
  }
}
