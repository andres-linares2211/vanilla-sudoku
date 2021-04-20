import { Board } from './game/Board';
import { addNumericTooltip } from './ui/NumericTooltip';
import { addHighlighters } from './ui/Highlighter';
import { paintCell } from './ui/CellPainter';

const app = document.getElementById('root')!;
const pencilCheckbox = document.getElementById('pencilCheckbox')! as HTMLInputElement;
let inputs: HTMLInputElement[] = [];
let game: Board;

initialize();

function initialize() {
  game = new Board(() => paint());
  game.initialize();

  paint();
}

function paint() {
  app.innerHTML = '';
  inputs = [];

  for (let i = 0; i < 9 * 9; i++) {
    const cell = game.cells[i];
    const cellElement = paintCell(cell, i);
    const input = cellElement.querySelector('input')!;

    // addHighlighters(input, inputs, i);
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
    app?.appendChild(cellElement);
  }
}
