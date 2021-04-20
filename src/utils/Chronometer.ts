export class Chronometer {
  private initialTime!: number;
  private finalTime!: number;
  private interval!: NodeJS.Timeout;

  constructor(autoStart = false) {
    if (autoStart) this.initialTime = this.now;
  }

  start(): void {
    this.initialTime = this.now;
  }

  stop(): TimeResult {
    const totalTime = this.finalTime - this.initialTime;
    clearTimeout(this.interval);

    return {
      time: totalTime,
      formattedTime: this.formatTime(totalTime),
    };
  }

  listen(callback: (time: TimeResult) => void): void {
    this.interval = setInterval(
      () => callback({ time: this.time, formattedTime: this.formatedTime }),
      100
    );
  }

  get time(): number {
    return this.now - this.initialTime;
  }

  get formatedTime(): string {
    return this.formatTime(this.time);
  }

  get now(): number {
    return performance.now();
  }

  private formatTime(time: number): string {
    const padZeros = (number: number) => number.toString().padStart(2, '0');

    const minutes = padZeros(Math.floor(time / 1000 / 60));
    const seconds = padZeros(Math.floor((time / 1000) % 60));
    const fraction = Math.floor((time % 1000) / 100);

    return `${minutes}:${seconds}.${fraction}`;
  }
}

interface TimeResult {
  time: number;
  formattedTime: string;
}
