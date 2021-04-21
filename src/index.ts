import './ui/Translator';
import { Board } from './game/Board';
import { addHighlighters } from './ui/Highlighter';
import { paintCell } from './ui/CellPainter';
import { difficulty } from './game/BoardGenerator';
import { startChronometer } from './ui/Chronometer';
import { Chronometer } from './utils/Chronometer';

let inputs: HTMLInputElement[] = [];
let cellElements: HTMLDivElement[] = [];
let game: Board;
let chronometer: Chronometer | null;

const app = document.getElementById('root')!;
const pencilCheckbox = document.getElementById('pencilCheckbox')! as HTMLInputElement;
const difficultySelector = document.getElementById('difficultySelector')! as HTMLSelectElement;
const helpButton = document.getElementById('helpButton');

initialize();

difficultySelector.addEventListener('change', () => initialize());

window.addEventListener('contextmenu', (event) => {
  if (!pencilCheckbox) return;

  pencilCheckbox.checked = !pencilCheckbox.checked;
  event.preventDefault();
});

helpButton?.addEventListener('click', () => {
  game.useHelp();
});

function initialize() {
  const level = difficultySelector.value as difficulty;
  game = new Board(() => paint(), level);
  game.initialize();

  if (chronometer) chronometer.stop();
  chronometer = startChronometer();

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

    input.addEventListener('keydown', (event) => {
      input.blur();

      const isNumeric = /^\d+$/.test(event.key);
      const isBackspace = event.key === 'Backspace';

      if (!isNumeric && !isBackspace) {
        input.value = cell.value ? cell.value.toString() : '';
        return;
      }

      input.value = event.key === 'Backspace' ? '' : event.key;
      input.dispatchEvent(new Event('change'));
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
