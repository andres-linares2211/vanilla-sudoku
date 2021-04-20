import { Chronometer } from '../utils/Chronometer';

export function startChronometer(): Chronometer | null {
  const element = document.getElementById('chronometer');
  if (!element) return null;

  const chronometer = new Chronometer();
  chronometer.listen((time) => {
    element.innerHTML = time.formattedTime;
  });

  chronometer.start();
  return chronometer;
}
