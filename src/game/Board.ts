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
    this.onUpdate();
  }

  revalidateCells() {
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
