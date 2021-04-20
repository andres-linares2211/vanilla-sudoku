import { Cell } from '../game/Cell';
import { QUADRANT_INDEXES } from '../game/constants';

export function paintCell(cell: Cell, index: number): HTMLDivElement {
  const cellElement = document.createElement('div');
  const input = document.createElement('input');

  cellElement.classList.add('cell');
  cellElement.appendChild(input);

  setNumericAttributes(input, cell);
  setBorders(cellElement, index);
  setAltBackground(cellElement, index);
  setStyles(cellElement, cell);
  showPencilMarks(cellElement, cell);

  return cellElement;
}

function showPencilMarks(cellElement: HTMLDivElement, cell: Cell) {
  if (cell.pencilMarks.length === 0) return;

  cell.pencilMarks.forEach((pencilMark) => {
    const mark = document.createElement('span');
    mark.innerHTML = pencilMark.toString();

    if ([1, 4, 7].includes(pencilMark)) mark.style.left = '0';
    if ([3, 6, 9].includes(pencilMark)) mark.style.right = '0';
    if ([1, 2, 3].includes(pencilMark)) mark.style.top = '0';
    if ([7, 8, 9].includes(pencilMark)) mark.style.bottom = '0';

    if ([2, 8].includes(pencilMark)) {
      mark.style.left = '50%';
      mark.style.transform = 'translateX(-50%)';
    }
    if ([4, 6].includes(pencilMark)) {
      mark.style.top = '50%';
      mark.style.transform = 'translateY(-50%)';
    }
    if (pencilMark === 5) {
      mark.style.left = '50%';
      mark.style.top = '50%';
      mark.style.transform = 'translate(-50%, -50%)';
    }

    cellElement.appendChild(mark);
  });
}

function setStyles(cellElement: HTMLDivElement, cell: Cell) {
  if (cell.error) cellElement.classList.add('error');
  else cellElement.classList.remove('error');

  if (cell.autocompleted) cellElement.classList.add('autocompleted');
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

function setBorders(cellElement: HTMLDivElement, index: number) {
  const shouldHaveTopBorder = index % 27 < 9 && index > 9;
  const shouldHaveLeftBorder = index % 3 === 0 && index % 9 !== 0;

  if (shouldHaveTopBorder) {
    cellElement.style.borderTopWidth = 'var(--border-width-thick)';
    cellElement.style.borderTopColor = 'var(--border-color-thick)';
  }
  if (shouldHaveLeftBorder) {
    cellElement.style.borderLeftWidth = 'var(--border-width-thick)';
    cellElement.style.borderLeftColor = 'var(--border-color-thick)';
  }
}

function setAltBackground(cellElement: HTMLDivElement, index: number) {
  const evenQuadrants = QUADRANT_INDEXES.filter((_, i) => i % 2 !== 0);
  const isInEvenQuadrant = evenQuadrants.find((quadrant) => quadrant.includes(index));

  if (!isInEvenQuadrant) cellElement.classList.add('alt-background');
}
