import { BoardGenerator, difficulty } from './BoardGenerator';
import { Cell } from './Cell';
import { Finder } from './Finder';
import { SmartPlayer } from './SmartPlayer';

export class Board {
  private difficulty: difficulty;
  private onUpdate: () => void;
  cells!: Cell[];

  constructor(onUpdate: () => void, difficulty: difficulty = 'MEDIUM') {
    this.difficulty = difficulty;
    this.onUpdate = onUpdate;
  }

  initialize(): void {
    this.cells = new BoardGenerator(this.difficulty).generateBoard();
  }

  setValue(cell: Cell, value: number | null): void {
    cell.value = value;
    this.revalidateCells();
    this.checkAutocomplete();
    this.onUpdate();
  }

  addPencilMark(cell: Cell, value: number): void {
    cell.addPencilMark(value);
    this.revalidateCells();
    this.onUpdate();
  }

  useHelp(): void {
    const smartPlayer = new SmartPlayer(this.cells);
    smartPlayer.setSingleValue();

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
      let index = 0;
      const interval = setInterval(() => {
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

    const playerCells = this.cells.filter(
      (cell) => cell.manipulated || cell.pencilMarks.length > 0
    );
    playerCells.forEach((cell) => {
      const validSolutions = finder.getPossibleValues(cell.index, this.cells);

      cell.error = cell.value === null ? false : !validSolutions.includes(cell.value);

      const invalidMarks = cell.pencilMarks.filter((mark) => !validSolutions.includes(mark));
      invalidMarks.forEach((mark) => cell.removePencilMark(mark));
    });
  }
}
