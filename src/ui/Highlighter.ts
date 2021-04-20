import { QUADRANT_INDEXES } from '../game/constants';

export function addHighlighters(
  cellElement: HTMLDivElement,
  cellElements: HTMLDivElement[],
  index: number
): void {
  const input = cellElement.querySelector('input')!;
  input.addEventListener('focus', () => showHighlight(cellElements, cellElement, index));
  input.addEventListener('mouseenter', () => showHighlight(cellElements, cellElement, index));

  input.addEventListener('blur', () => hideHighligt(cellElements));
  input.addEventListener('mouseleave', () => hideHighligt(cellElements));
}

function showHighlight(cellElements: HTMLDivElement[], cellElement: HTMLDivElement, index: number) {
  const { inputsInQuadrant, inputsInColumn, inputsInRow } = getInputs(cellElements, index);

  inputsInQuadrant?.forEach((input) => input.classList.add('highlight'));
  inputsInColumn.forEach((input) => input.classList.add('highlight'));
  inputsInRow.forEach((input) => input.classList.add('highlight'));
  cellElement.classList.add('highlight--main');
}

function getInputs(cellElements: HTMLDivElement[], index: number) {
  const inputsInQuadrant = QUADRANT_INDEXES.find((quadrant) => quadrant.includes(index))?.map(
    (i) => cellElements[i]
  );
  const inputsInColumn = cellElements.filter((_, i) => i % 9 === index % 9);
  const inputsInRow = cellElements.filter(
    (_, i) => i >= Math.floor(index / 9) * 9 && i < Math.ceil(index / 9) * 9
  );

  return { inputsInQuadrant, inputsInColumn, inputsInRow };
}

function hideHighligt(cellElements: HTMLDivElement[]) {
  cellElements.forEach((cell) => cell.classList.remove('highlight', 'highlight--main'));
}
