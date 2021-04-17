export class Judge {
  isValidGame(values: number[]): boolean {
    if (values.length !== 9 * 9) return false;
    if (!values.every((value) => value >= 1 && value <= 9)) return false;
    if (!this.validAmountOfValues(values)) return false;
    if (!this.validRows(values)) return false;

    return true;
  }

  private validRows(values: number[]): boolean {
    const row1 = values.slice(0, 9);
    const row2 = values.slice(9, 18);
    const row3 = values.slice(18, 27);
    const row4 = values.slice(27, 36);
    const row5 = values.slice(36, 45);
    const row6 = values.slice(45, 54);
    const row7 = values.slice(54, 63);
    const row8 = values.slice(63, 72);
    const row9 = values.slice(72, 81);

    const validRow1 = this.allAreDifferent(row1);
    const validRow2 = this.allAreDifferent(row2);
    const validRow3 = this.allAreDifferent(row3);
    const validRow4 = this.allAreDifferent(row4);
    const validRow5 = this.allAreDifferent(row5);
    const validRow6 = this.allAreDifferent(row6);
    const validRow7 = this.allAreDifferent(row7);
    const validRow8 = this.allAreDifferent(row8);
    const validRow9 = this.allAreDifferent(row9);

    return (
      validRow1 &&
      validRow2 &&
      validRow3 &&
      validRow4 &&
      validRow5 &&
      validRow6 &&
      validRow7 &&
      validRow8 &&
      validRow9
    );
  }

  private validAmountOfValues(values: number[]) {
    const countsArray = values.reduce(
      (acc, value) => {
        acc[value - 1]++;
        return acc;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    return countsArray.every((count) => count === 9);
  }

  private allAreDifferent(values: number[]) {
    if (values.length !== 9) throw new Error('Invalid check');

    const onlyFilledValues = values.filter((value) => !!value);
    const uniqueArray = [...new Set(onlyFilledValues)];

    return onlyFilledValues.length === uniqueArray.length;
  }
}
