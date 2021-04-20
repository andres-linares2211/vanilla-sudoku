import { Board } from './game/Board';
import { addNumericTooltip } from './ui/NumericTooltip';
import { addHighlighters } from './ui/Highlighter';
import { paintCell } from './ui/CellPainter';

const app = document.getElementById('root');
const inputs: HTMLInputElement[] = [];
let game: Board;

initialize();

function initialize() {
  game = new Board(() => paint());
  game.initialize();

  paint();
}

function paint() {
  if (app) app.innerHTML = '';

  for (let i = 0; i < 9 * 9; i++) {
    const cell = game.cells[i];
    const input = paintCell(cell, i);

    addHighlighters(input, inputs, i);
    // addNumericTooltip(input);

    input.addEventListener('change', () => game.setValue(cell, input.value ? +input.value : null));

    inputs.push(input);
    app?.appendChild(input);
  }
}
