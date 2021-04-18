import { QUADRANT_INDEXES } from '../game/constants.js';

export function addHighlighters(
  input: HTMLInputElement,
  inputs: HTMLInputElement[],
  index: number
) {
  input.addEventListener('focus', () => showHighlight(inputs, index));
  input.addEventListener('mouseenter', () => showHighlight(inputs, index));

  input.addEventListener('blur', () => hideHighligt(inputs));
  input.addEventListener('mouseleave', () => hideHighligt(inputs));
}

function showHighlight(inputs: HTMLInputElement[], index: number) {
  const { inputsInQuadrant, inputsInColumn, inputsInRow } = getInputs(inputs, index);

  inputsInQuadrant?.forEach((input) => input.classList.add('highlight--soft'));
  inputsInColumn.forEach((input) => input.classList.add('highlight'));
  inputsInRow.forEach((input) => input.classList.add('highlight'));
}

function getInputs(inputs: HTMLInputElement[], index: number) {
  const inputsInQuadrant = QUADRANT_INDEXES.find((quadrant) => quadrant.includes(index))?.map(
    (i) => inputs[i]
  );
  const inputsInColumn = inputs.filter((_, i) => i % 9 === index % 9);
  const inputsInRow = inputs.filter(
    (_, i) => i >= Math.floor(index / 9) * 9 && i < Math.ceil(index / 9) * 9
  );

  return { inputsInQuadrant, inputsInColumn, inputsInRow };
}

function hideHighligt(inputs: HTMLInputElement[]) {
  inputs.forEach((input) => input.classList.remove('highlight', 'highlight--soft'));
}
