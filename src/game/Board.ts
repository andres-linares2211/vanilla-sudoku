import { BoardGenerator } from './BoardGenerator';
import { Cell } from './Cell';
import { Finder } from './Finder';

export class Board {
  private onUpdate: Function;
  cells!: Cell[];

  constructor(onUpdate: Function) {
    this.onUpdate = onUpdate;
  }

  initialize() {
    this.cells = new BoardGenerator().generateBoard();
  }

  setValue(cell: Cell, value: number | null) {
    cell.value = value;
    this.revalidateCells();
    this.checkAutocomplete();
    this.onUpdate();
  }

  private checkAutocomplete() {
    if (this.cells.some((cell) => cell.error)) return;

    const finder = new Finder();

    const emptyCells = this.cells.filter((cell) => cell.value === null);
    const solutionsPerCell = emptyCells.map((cell) =>
      finder.getPossibleValues(cell.index, this.cells)
    );

    if (solutionsPerCell.every((solutions) => solutions.length === 1)) {
      console.log('starting autocomplete!');

      let index = 0;
      const interval = setInterval(() => {
        console.log(index, emptyCells.length);
        if (index + 1 > emptyCells.length) {
          clearInterval(interval);
          return;
        }

        const cell = emptyCells[index];
        cell.value = finder.getPossibleValues(cell.index, this.cells)[0];
        cell.autocompleted = true;
        index += 1;
        this.onUpdate();
      }, 300);
    }
  }

  private revalidateCells() {
    const finder = new Finder();

    const manipulatedCells = this.cells.filter((cell) => cell.manipulated);
    manipulatedCells.forEach((cell) => {
      if (cell.value === null) {
        cell.error = false;
        return;
      }

      const validSolutions = finder.getPossibleValues(cell.index, this.cells);
      cell.error = !validSolutions.includes(cell.value);
    });
  }
}
