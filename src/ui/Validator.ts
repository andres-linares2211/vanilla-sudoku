import { Validator } from '../game/Validator.js';

export function addValidator(input: HTMLInputElement, index: number, values: (number | null)[]) {
  const validator = new Validator();

  input.addEventListener('change', () => {
    const newValue = +input.value;
    const isValid = validator.validate(newValue, index, values);

    if (isValid || !newValue) {
      input.classList.remove('error');
    } else {
      input.classList.add('error');
    }
  });
}
