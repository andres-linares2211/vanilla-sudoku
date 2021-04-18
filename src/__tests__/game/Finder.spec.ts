import { Cell } from '../../game/Cell';
import { Finder } from '../../game/Finder';

function createEmptyBoard(): Cell[] {
  const cells = [];

  for (let i = 0; i < 9 * 9; i++) {
    cells.push(new Cell(null, i));
  }

  return cells;
}

describe('Finder', () => {
  describe('no data', () => {
    it('should return all values for any position in the board', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      possibilities = finder.getPossibleValues(9, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      possibilities = finder.getPossibleValues(80, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      possibilities = finder.getPossibleValues(40, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('with data', () => {
    it('should return only available values in row', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      cells[2].value = 7;
      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[4].value = 2;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 5, 6, 8, 9]);

      cells[8].value = 9;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 5, 6, 8]);

      cells[0].value = 1;
      cells[1].value = 3;
      cells[3].value = 4;
      cells[5].value = 5;
      cells[6].value = 6;
      cells[7].value = 8;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([]);
    });

    it('should return available values in column', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      cells[0].value = 7;
      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[45].value = 1;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([2, 3, 4, 5, 6, 8, 9]);

      cells[18].value = 4;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([2, 3, 5, 6, 8, 9]);

      cells[9].value = 2;
      cells[27].value = 3;
      cells[36].value = 5;
      cells[54].value = 6;
      cells[63].value = 8;
      cells[72].value = 9;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([]);
    });

    it('should return available values in quadrant', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      cells[0].value = 7;
      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[10].value = 1;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([2, 3, 4, 5, 6, 8, 9]);

      cells[19].value = 4;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([2, 3, 5, 6, 8, 9]);

      cells[1].value = 2;
      cells[2].value = 3;
      cells[9].value = 5;
      cells[11].value = 6;
      cells[18].value = 8;
      cells[20].value = 9;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([]);
    });

    it('should return possible values in row and column', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      cells[1].value = 7;
      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[9].value = 7;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[18].value = 2;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 5, 6, 8, 9]);

      cells[2].value = 5;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 6, 8, 9]);
    });

    it('should return possible values in row and quadrant', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      cells[1].value = 7;
      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[19].value = 7;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[11].value = 2;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 5, 6, 8, 9]);

      cells[2].value = 5;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 6, 8, 9]);
    });

    it('should return possible values in column and quadrant', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      cells[36].value = 7;
      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[19].value = 7;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[11].value = 2;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 5, 6, 8, 9]);

      cells[45].value = 5;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 6, 8, 9]);
    });

    it('should return possible values in column, row and quadrant', () => {
      const finder = new Finder();
      const cells = createEmptyBoard();

      cells[36].value = 7;
      let possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[19].value = 7;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 2, 3, 4, 5, 6, 8, 9]);

      cells[11].value = 2;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 5, 6, 8, 9]);

      cells[45].value = 5;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 3, 4, 6, 8, 9]);

      cells[4].value = 3;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 4, 6, 8, 9]);

      cells[7].value = 9;
      possibilities = finder.getPossibleValues(0, cells);
      expect(possibilities).toEqual([1, 4, 6, 8]);
    });
  });
});
