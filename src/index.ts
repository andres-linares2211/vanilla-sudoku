import { Board } from './game/Board.js';
import { QUADRANT_INDEXES } from './game/constants.js';
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

    const hightlight = (event: FocusEvent | MouseEvent) => {
      const quadrantIndexes = QUADRANT_INDEXES.find((quadrant) => quadrant.includes(i));
      quadrantIndexes?.forEach((index) => inputs[index].classList.add('highlight', 'soft'));

      const firstIndexInColumn = i % 9;
      for (let i = 0; i < 9; i++) {
        inputs[firstIndexInColumn + i * 9].classList.add('highlight');
        inputs[firstIndexInColumn + i * 9].classList.remove('soft');
      }

      const firstIndexInRow = Math.floor(i / 9) * 9;
      for (let i = 0; i < 9; i++) {
        inputs[firstIndexInRow + i].classList.add('highlight');
        inputs[firstIndexInRow + i].classList.remove('soft');
      }
    };

    const unHightlight = (event: FocusEvent | MouseEvent) => {
      const input = event.target as HTMLInputElement;
      input.classList.remove('highlight');
      inputs.forEach((input) => input.classList.remove('highlight', 'soft'));
    };

    input.addEventListener('focus', hightlight);
    input.addEventListener('mouseenter', hightlight);
    input.addEventListener('blur', unHightlight);
    input.addEventListener('mouseleave', unHightlight);

    inputs.push(input);
    app?.appendChild(input);
  }
}
