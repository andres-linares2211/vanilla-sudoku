import { Board } from './game/Board.js';
import { QUADRANT_INDEXES } from './game/constants.js';

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
    const input = document.createElement('input');
    input.setAttribute('min', '1');
    input.setAttribute('max', '9');
    input.setAttribute('type', 'number');
    if (value) {
      input.value = value.toString();
      input.readOnly = true;
    }

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

    if (i % 27 < 9) input.style.borderTopWidth = 'var(--thick-border-width)';
    if (i + 1 > 9 * 9 - 9) input.style.borderBottomWidth = 'var(--thick-border-width)';
    if ((i + 1) % 3 === 0) input.style.borderRightWidth = 'var(--thick-border-width)';
    if (i % 9 === 0) input.style.borderLeftWidth = 'var(--thick-border-width)';

    inputs.push(input);
    app?.appendChild(input);
  }
}
