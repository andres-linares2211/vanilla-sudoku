import { Board } from './game/Board';
import { addNumericTooltip } from './ui/NumericTooltip';
import { addHighlighters } from './ui/Highlighter';
import { paintCell } from './ui/CellPainter';
import { difficulty } from './game/BoardGenerator';

const app = document.getElementById('root')!;
const pencilCheckbox = document.getElementById('pencilCheckbox')! as HTMLInputElement;
const difficultySelector = document.getElementById('difficultySelector')! as HTMLSelectElement;

let inputs: HTMLInputElement[] = [];
let cellElements: HTMLDivElement[] = [];
let game: Board;

initialize();

difficultySelector.addEventListener('change', () => initialize());

function initialize() {
  const level = difficultySelector.value as difficulty;
  game = new Board(() => paint(), level);
  game.initialize();

  paint();
}

function paint() {
  app.innerHTML = '';
  inputs = [];
  cellElements = [];

  for (let i = 0; i < 9 * 9; i++) {
    const cell = game.cells[i];
    const cellElement = paintCell(cell, i);
    const input = cellElement.querySelector('input')!;

    addHighlighters(cellElement, cellElements, i);
    // addNumericTooltip(input);

    input.addEventListener('input', () => {
      input.blur();
    });

    input.addEventListener('change', () => {
      if (pencilCheckbox.checked) {
        if (input.value) game.addPencilMark(cell, +input.value);
      } else {
        game.setValue(cell, input.value ? +input.value : null);
      }
    });

    inputs.push(input);
    cellElements.push(cellElement);
    app?.appendChild(cellElement);
  }
}
