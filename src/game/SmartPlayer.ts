import { Cell } from './Cell';
import { Finder } from './Finder';

/**
 * The Smart Player object will play a game and determines if the game is winnable or not.
 */
export class SmartPlayer {
  private finder = new Finder();
  private isImpossibleGame = false;
  private cells: Cell[];

  constructor(cells: Cell[]) {
    this.cells = cells;
  }

  /**
   * Returns true only if the game is winnable.
   *
   * @param board
   */
  play(): boolean {
    while (this.areThereEmptyValues && !this.isImpossibleGame) {
      this.setSingleValue();
    }

    return !this.isImpossibleGame;
  }

  private get areThereEmptyValues(): boolean {
    return this.cells.filter(({ value }) => value === null).length > 0;
  }

  setSingleValue() {
    for (let i = 0; i < 9 * 9; i++) {
      if (this.cells[i].value !== null) continue;

      const possibilities = this.finder.getPossibleValues(i, this.cells);
      if (possibilities.length === 1) {
        this.cells[i].value = possibilities[0];
        return;
      }
    }

    this.isImpossibleGame = true;
  }
}
