export class BoardGenerator {
  private numbers: number[] = [];

  generateBoard() {
    for (let i = 0; i < 9 * 9; i++) {
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      this.numbers.push(randomNumber);
    }

    return this.numbers;
  }
}
