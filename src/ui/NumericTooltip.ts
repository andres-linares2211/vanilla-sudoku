export function addNumericTooltip(input: HTMLInputElement) {
  input.addEventListener('click', () => showTooltip(input));
}

function showTooltip(input: HTMLInputElement) {
  const tooltip = createTooltip();
  addButtons(tooltip, input);
  positionTooltip(tooltip, input);

  document.body.appendChild(tooltip);
}

function positionTooltip(tooltip: HTMLDivElement, input: HTMLInputElement) {
  const DOMRect = input.getBoundingClientRect();

  tooltip.style.left = `${DOMRect.left - DOMRect.width / 2}px`;
  tooltip.style.top = `${DOMRect.top - 95}px`;
}

function addButtons(tooltip: HTMLDivElement, input: HTMLInputElement) {
  for (let i = 1; i <= 9; i++) {
    const button = createButton(i);
    button.addEventListener('click', () => (input.value = i.toString()));
    tooltip.appendChild(button);
  }
}

function createTooltip() {
  const tooltipId = 'numericTooltip';

  document.getElementById(tooltipId)?.remove();

  const tooltip = document.createElement('div');
  tooltip.id = tooltipId;

  return tooltip;
}

function createButton(value: number) {
  const button = document.createElement('button');
  button.innerHTML = value.toString();

  return button;
}
