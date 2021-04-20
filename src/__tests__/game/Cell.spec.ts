import { Cell } from '../../game/Cell';

describe('Cell', () => {
  describe('constructor', () => {
    it('should initially have the value passed by parameter', () => {
      expect(new Cell(1, 0).value).toEqual(1);
      expect(new Cell(9, 0).value).toEqual(9);
      expect(new Cell(null, 0).value).toEqual(null);
    });

    it('should initially be without errors and no manipulated', () => {
      expect(new Cell(1, 0).error).toEqual(false);
      expect(new Cell(9, 0).error).toEqual(false);
      expect(new Cell(null, 0).error).toEqual(false);

      expect(new Cell(1, 0).manipulated).toEqual(false);
      expect(new Cell(9, 0).manipulated).toEqual(false);
      expect(new Cell(null, 0).manipulated).toEqual(false);
    });
  });

  it('should only allow to set a valid value after created', () => {
    const cell = new Cell(1, 0);

    cell.value = 2;
    expect(cell.value).toEqual(2);

    cell.value = 7;
    expect(cell.value).toEqual(7);

    cell.value = null;
    expect(cell.value).toEqual(null);

    cell.value = 43;
    expect(cell.value).toEqual(null);

    cell.value = 0;
    expect(cell.value).toEqual(null);
  });

  it('should be manipulated after setting the value post creation', () => {
    const cell = new Cell(1, 0);
    expect(cell.manipulated).toEqual(false);

    cell.value = 2;
    expect(cell.manipulated).toEqual(true);
  });

  describe('pencil marks', () => {
    it('should initially not contain pencil marks', () => {
      const cell = new Cell(1, 0);
      expect(cell.pencilMarks).toEqual([]);
    });

    it('should set pencilMarks only for empty cells', () => {
      const cell = new Cell(1, 0);
      cell.addPencilMark(1);
      expect(cell.pencilMarks).toEqual([]);

      cell.value = null;
      cell.addPencilMark(2);
      expect(cell.pencilMarks).toEqual([2]);
    });

    it('should erase pencil marks after value is set', () => {
      const cell = new Cell(null, 0);
      cell.addPencilMark(1);
      cell.addPencilMark(6);
      expect(cell.pencilMarks).toEqual([1, 6]);

      cell.value = 2;
      expect(cell.pencilMarks).toEqual([]);

      cell.value = null;
      expect(cell.pencilMarks).toEqual([]);

      cell.addPencilMark(9);
      expect(cell.pencilMarks).toEqual([9]);
    });

    it('should only accept valid values in pencil mark', () => {
      const cell = new Cell(null, 0);

      cell.addPencilMark(1);
      expect(cell.pencilMarks).toEqual([1]);

      cell.addPencilMark(5);
      expect(cell.pencilMarks).toEqual([1, 5]);

      cell.addPencilMark(9);
      expect(cell.pencilMarks).toEqual([1, 5, 9]);

      cell.addPencilMark(10);
      expect(cell.pencilMarks).toEqual([1, 5, 9]);

      cell.addPencilMark(0);
      expect(cell.pencilMarks).toEqual([1, 5, 9]);

      cell.addPencilMark(666);
      expect(cell.pencilMarks).toEqual([1, 5, 9]);

      cell.addPencilMark(-666);
      expect(cell.pencilMarks).toEqual([1, 5, 9]);
    });

    it('should not repeat pencil marks', () => {
      const cell = new Cell(null, 0);

      cell.addPencilMark(1);
      expect(cell.pencilMarks).toEqual([1]);

      cell.addPencilMark(1);
      expect(cell.pencilMarks).toEqual([1]);
    });
  });
});
