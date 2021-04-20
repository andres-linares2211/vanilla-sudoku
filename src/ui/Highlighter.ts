import { QUADRANT_INDEXES } from '../game/constants';

export function addHighlighters(
  cell: HTMLDivElement,
  cells: HTMLDivElement[],
  index: number
): void {
  const input = cell.querySelector('input');
  if (!input) return;

  input.addEventListener('focus', () => showHighlight(cells, cell, index));
  input.addEventListener('mouseenter', () => showHighlight(cells, cell, index));

  input.addEventListener('blur', () => hideHighligt(cells));
  input.addEventListener('mouseleave', () => hideHighligt(cells));
}

function showHighlight(cells: HTMLDivElement[], cell: HTMLDivElement, index: number) {
  const { cellsInQuadrant, cellsInColumn, cellsInRow } = getCells(cells, index);

  cellsInQuadrant?.forEach((cell) => cell.classList.add('highlight'));
  cellsInColumn.forEach((cell) => cell.classList.add('highlight'));
  cellsInRow.forEach((cell) => cell.classList.add('highlight'));
  cell.classList.add('highlight--main');
}

function getCells(cells: HTMLDivElement[], index: number) {
  const cellsInQuadrant = QUADRANT_INDEXES.find((quadrant) => quadrant.includes(index))?.map(
    (i) => cells[i]
  );
  const cellsInColumn = cells.filter((_, i) => i % 9 === index % 9);
  const cellsInRow = cells.filter(
    (_, i) => i >= Math.floor(index / 9) * 9 && i < Math.ceil(index / 9) * 9
  );

  return { cellsInQuadrant, cellsInColumn, cellsInRow };
}

function hideHighligt(cells: HTMLDivElement[]) {
  cells.forEach((cell) => cell.classList.remove('highlight', 'highlight--main'));
}
