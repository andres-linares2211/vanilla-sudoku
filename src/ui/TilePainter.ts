import { QUADRANT_INDEXES } from '../game/constants.js';

export function paintTile(value: number | null, index: number): HTMLInputElement {
  const input = document.createElement('input');

  setNumericAttributes(input, value);
  setBorders(input, index);
  setAltBackground(input, index);

  return input;
}

function setNumericAttributes(input: HTMLInputElement, value: number | null) {
  input.min = '1';
  input.max = '9';
  input.type = 'number';

  if (value) {
    input.value = value.toString();
    input.readOnly = true;
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
