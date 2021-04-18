import { Cell } from '../../game/Cell';
import { Judge } from '../../game/Judge';

function createEmptyBoard(): Cell[] {
  const cells = [];

  for (let i = 0; i < 9 * 9; i++) {
    cells.push(new Cell(null, i));
  }

  return cells;
}

describe('Judge', () => {
  it('should be valid on empty boards', () => {
    const judge = new Judge();
    const cells = createEmptyBoard();
    expect(judge.isValidGame(cells)).toBeTruthy();
  });

  it('should be valid only on boards that are 9 * 9', () => {
    const judge = new Judge();
    let cells = createEmptyBoard();
    expect(judge.isValidGame(cells)).toBeTruthy();

    cells.push(new Cell(null, 81));
    expect(judge.isValidGame(cells)).toBeFalsy();

    cells = cells.slice(0, 50);
    expect(judge.isValidGame(cells)).toBeFalsy();
  });

  it('should be valid only when all values are between 1 to 9 or are null', () => {
    const judge = new Judge();
    let cells = createEmptyBoard();
    expect(judge.isValidGame(cells)).toBeTruthy();

    cells[0].value = 9;
    expect(judge.isValidGame(cells)).toBeTruthy();

    cells[80].value = 1;
    expect(judge.isValidGame(cells)).toBeTruthy();

    cells[0].value = 10;
    expect(judge.isValidGame(cells)).toBeFalsy();

    cells[0].value = 0;
    expect(judge.isValidGame(cells)).toBeFalsy();
  });

  describe('valid states', () => {
    it('should be valid on empty board', () => {
      const judge = new Judge();
      const cells = createEmptyBoard();

      expect(judge.isValidGame(cells)).toEqual(true);
    });

    it('should return valid on valid rows', () => {
      const judge = new Judge();
      const cells = createEmptyBoard();

      cells[0].value = 1;
      expect(judge.isValidGame(cells)).toEqual(true);
    });
  });
});
