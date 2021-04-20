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
  const shouldHaveTopBorder = index % 27 < 9 && index > 9;
  const shouldHaveRightBorder = (index + 1) % 3 === 0 && index % 9 !== 8;

  if (shouldHaveTopBorder) {
    input.style.borderTopWidth = 'var(--border-width-thick)';
    input.style.borderTopColor = 'var(--border-color-thick)';
  }
  if (shouldHaveRightBorder) {
    input.style.borderRightWidth = 'var(--border-width-thick)';
    input.style.borderRightColor = 'var(--border-color-thick)';
  }
}

function setAltBackground(input: HTMLInputElement, index: number) {
  const evenQuadrants = QUADRANT_INDEXES.filter((_, i) => i % 2 !== 0);
  const isInEvenQuadrant = evenQuadrants.find((quadrant) => quadrant.includes(index));

  if (!isInEvenQuadrant) input.classList.add('alt-background');
}
