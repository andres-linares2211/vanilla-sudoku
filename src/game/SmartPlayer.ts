import { Finder } from './Finder.js';

/**
 * The Smart Player object will play a game and determines if the game is winnable or not.
 */
export class SmartPlayer {
  private finder = new Finder();
  private isImpossibleGame = false;
  private values: (number | null)[];

  constructor(values: (number | null)[]) {
    this.values = values;
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
    return this.values.filter((value) => value === null).length > 0;
  }

  setSingleValue() {
    for (let i = 0; i < 9 * 9; i++) {
      if (this.values[i] !== null) continue;

      const possibilities = this.finder.getPossibleValues(i, this.values);
      if (possibilities.length === 1) {
        this.values[i] = possibilities[0];
        return;
      }
    }

    this.isImpossibleGame = true;
  }
}
