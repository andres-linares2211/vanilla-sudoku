export class Judge {
  isValidGame(values: number[]): boolean {
    if (values.length !== 9 * 9) return false;
    if (!values.every((value) => value >= 1 && value <= 9)) return false;
    if (!this.validAmountOfValues(values)) return false;
    if (!this.validRows(values)) return false;
    if (!this.validColumns(values)) return false;

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

  private validColumns(values: number[]): boolean {
    const column1 = values.filter((value, index) => index % 9 === 0);
    const column2 = values.filter((value, index) => index % 9 === 1);
    const column3 = values.filter((value, index) => index % 9 === 2);
    const column4 = values.filter((value, index) => index % 9 === 3);
    const column5 = values.filter((value, index) => index % 9 === 4);
    const column6 = values.filter((value, index) => index % 9 === 5);
    const column7 = values.filter((value, index) => index % 9 === 6);
    const column8 = values.filter((value, index) => index % 9 === 7);
    const column9 = values.filter((value, index) => index % 9 === 8);

    const validColumn1 = this.allAreDifferent(column1);
    const validColumn2 = this.allAreDifferent(column2);
    const validColumn3 = this.allAreDifferent(column3);
    const validColumn4 = this.allAreDifferent(column4);
    const validColumn5 = this.allAreDifferent(column5);
    const validColumn6 = this.allAreDifferent(column6);
    const validColumn7 = this.allAreDifferent(column7);
    const validColumn8 = this.allAreDifferent(column8);
    const validColumn9 = this.allAreDifferent(column9);

    return (
      validColumn1 &&
      validColumn2 &&
      validColumn3 &&
      validColumn4 &&
      validColumn5 &&
      validColumn6 &&
      validColumn7 &&
      validColumn8 &&
      validColumn9
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
