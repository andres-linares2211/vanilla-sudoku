import { QUADRANT_INDEXES } from '../game/constants';

export function addHighlighters(
  input: HTMLInputElement,
  inputs: HTMLInputElement[],
  index: number
) {
  input.addEventListener('focus', () => showHighlight(inputs, input, index));
  input.addEventListener('mouseenter', () => showHighlight(inputs, input, index));

  input.addEventListener('blur', () => hideHighligt(inputs));
  input.addEventListener('mouseleave', () => hideHighligt(inputs));
}

function showHighlight(inputs: HTMLInputElement[], input: HTMLInputElement, index: number) {
  const { inputsInQuadrant, inputsInColumn, inputsInRow } = getInputs(inputs, index);

  inputsInQuadrant?.forEach((input) => input.classList.add('highlight'));
  inputsInColumn.forEach((input) => input.classList.add('highlight'));
  inputsInRow.forEach((input) => input.classList.add('highlight'));
  input.classList.add('highlight--main');
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
  inputs.forEach((input) => input.classList.remove('highlight', 'highlight--main'));
}
