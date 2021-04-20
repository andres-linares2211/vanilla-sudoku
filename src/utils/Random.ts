export function randomIntInRange(min: number, max: number): number {
  const difference = max - min;
  const random = Math.round(Math.random() * difference);

  return random + min;
}

export function randomIntUpTo(value: number): number {
  return Math.round(Math.random() * value);
}
