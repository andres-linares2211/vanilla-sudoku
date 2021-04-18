import { Board } from './game/Board.js';
import { addNumericTooltip } from './ui/NumericTooltip.js';
import { addHighlighters } from './ui/Highlighter.js';
import { paintTile } from './ui/TilePainter.js';

const app = document.getElementById('root');
const inputs: HTMLInputElement[] = [];
let game: Board;

initialize();

function initialize() {
  game = new Board();
  game.initialize();

  paint();
}

function paint() {
  for (let i = 0; i < 9 * 9; i++) {
    const value = game.values[i];
    const input = paintTile(value, i);

    addHighlighters(input, inputs, i);
    addNumericTooltip(input);

    inputs.push(input);
    app?.appendChild(input);
  }
}
