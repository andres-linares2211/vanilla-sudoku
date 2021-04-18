import { Cell } from '../game/Cell';
import { QUADRANT_INDEXES } from '../game/constants';

export function paintCell(cell: Cell, index: number): HTMLInputElement {
  const input = document.createElement('input');

  setNumericAttributes(input, cell);
  setBorders(input, index);
  setAltBackground(input, index);
  setStyles(input, cell);

  return input;
}

function setStyles(input: HTMLInputElement, cell: Cell) {
  if (cell.error) input.classList.add('error');
  else input.classList.remove('error');

  if (cell.autocompleted) input.classList.add('autocompleted');
}

function setNumericAttributes(input: HTMLInputElement, cell: Cell) {
  input.min = '1';
  input.max = '9';
  input.type = 'number';

  if (cell.value) {
    input.value = cell.value.toString();
    if (!cell.manipulated) input.readOnly = true;
  }
}

function setBorders(input: HTMLInputElement, index: number) {
  if (index % 27 < 9) input.style.borderTopWidth = 'var(--thick-border-width)';
  if (index + 1 > 9 * 9 - 9) input.style.borderBottomWidth = 'var(--thick-border-width)';
  if ((index + 1) % 3 === 0) input.style.borderRightWidth = 'var(--thick-border-width)';
  if (index % 9 === 0) input.style.borderLeftWidth = 'var(--thick-border-width)';
}

function setAltBackground(input: HTMLInputElement, index: number) {
  const evenQuadrants = QUADRANT_INDEXES.filter((_, i) => i % 2 !== 0);
  const isInEvenQuadrant = evenQuadrants.find((quadrant) => quadrant.includes(index));

  if (!isInEvenQuadrant) input.classList.add('alt-background');
}
