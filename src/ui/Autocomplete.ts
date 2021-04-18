import { Cell } from '../game/Cell';
import { Finder } from '../game/Finder';

export function addAutocomplete(input: HTMLInputElement, index: number, cells: Cell[]) {
  const finder = new Finder();

  input.addEventListener('change', () => {
    const emptyCells = cells
      .map((value, index) => ({ value, index }))
      .filter((value) => value.value === null);

    const numberOfSolutions = emptyCells.map((cell) => finder.getPossibleValues(cell.index, cells));

    if (numberOfSolutions.every((solution) => solution.length === 1)) {
      console.log('We can autocomplete!');
    }
  });
}
