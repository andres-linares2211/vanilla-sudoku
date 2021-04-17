const app = document.getElementById('root');
paint();

function paint() {
  for (let i = 0; i < 9 * 9; i++) {
    const input = document.createElement('input');
    input.setAttribute('min', '1');
    input.setAttribute('max', '9');
    input.setAttribute('type', 'number');

    if (i % 27 < 9) input.classList.add('border-top');
    if (i + 1 > 9 * 9 - 9) input.classList.add('border-bottom');
    if ((i + 1) % 3 === 0) input.classList.add('border-right');
    if (i % 9 === 0) input.classList.add('border-left');

    app?.appendChild(input);
  }
}
