import { Cell } from './Cell';
import { Finder } from './Finder';
import { Judge } from './Judge';
import { SmartPlayer } from './SmartPlayer';
import { cloneDeep } from 'lodash-es';

export class BoardGenerator {
  private finder = new Finder();
  private judge = new Judge();
  private player!: SmartPlayer;

  private cells: Cell[] = [];

  generateBoard(): Cell[] {
    this.buildFullBoard();
    this.removeValues();
    this.cells.forEach((cell) => cell.resetManipulation());

    return this.cells;
  }

  private removeValues() {
    let isWinnable = true;
    const maxTries = 1000;
    let count = 0;

    while (isWinnable || count < maxTries) {
      const randomIndex = Math.floor(Math.random() * this.cells.length);
      if (this.cells[randomIndex].value === null) continue;

      const value = this.cells[randomIndex].value;
      this.cells[randomIndex].value = null;

      this.player = new SmartPlayer(cloneDeep(this.cells));
      isWinnable = this.player.play();

      if (!isWinnable) {
        this.cells[randomIndex].value = value;
        count += 1;
      }
    }
  }

  private buildFullBoard() {
    let invalidGame = true;
    const initialTime = performance.now();

    while (invalidGame) {
      this.cells = [];

      for (let i = 0; i < 9 * 9; i++) {
        const possibleNumbers = this.finder.getPossibleValues(i, this.cells);

        if (performance.now() - initialTime > 100) {
          break;
        }

        if (possibleNumbers.length === 0) {
          const restartRowGeneration = () => {
            i = Math.floor(i / 9) * 9 - 1;
            this.cells = this.cells.splice(0, i + 1);
          };

          restartRowGeneration();
          continue;
        }

        const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
        const value = possibleNumbers[randomIndex];
        this.cells.push(new Cell(value, i));
      }

      invalidGame = !this.judge.isValidGame(this.cells);
      if (performance.now() - initialTime > 100) break;
    }

    if (invalidGame) this.buildFullBoard();
  }
}
