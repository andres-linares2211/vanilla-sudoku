export class Judge {
  isValidGame(values: number[]): boolean {
    if (values.length !== 9 * 9) return false;
    if (!values.every((value) => value >= 1 && value <= 9)) return false;
    if (!this.validAmountOfValues(values)) return false;

    return true;
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
