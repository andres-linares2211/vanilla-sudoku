import { Cell } from '../game/Cell';
import { Validator } from '../game/Validator';

export function addValidator(input: HTMLInputElement, index: number, cells: Cell[]) {
  const validator = new Validator();

  input.addEventListener('change', () => {
    const newValue = +input.value;
    const isValid = validator.validate(newValue, index, cells);

    if (isValid || !newValue) {
      input.classList.remove('error');
    } else {
      input.classList.add('error');
    }
  });
}
