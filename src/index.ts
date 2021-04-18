import { Board } from './game/Board';
import { addNumericTooltip } from './ui/NumericTooltip';
import { addHighlighters } from './ui/Highlighter';
import { paintCell } from './ui/CellPainter';
import { addValidator } from './ui/Validator';
import { addAutocomplete } from './ui/Autocomplete';

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
    const value = game.cells[i];
    const input = paintCell(value, i);

    addHighlighters(input, inputs, i);
    addNumericTooltip(input);
    // addValidator(input, i, game.currentValues);

    // input.addEventListener('change', () => game.setValue(i, input.value ? +input.value : null));

    // addAutocomplete(input, i, game.currentValues);

    inputs.push(input);
    app?.appendChild(input);
  }
}
