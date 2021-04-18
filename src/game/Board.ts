import { BoardGenerator } from './BoardGenerator';
import { Cell } from './Cell';

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
    this.onUpdate();
  }
}
