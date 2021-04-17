export class Judge {
  isValidGame(values: number[]): boolean {
    if (values.length !== 9 * 9) return false;
    if (!values.every((value) => value >= 1 && value <= 9)) return false;
    if (!this.validAmountOfValues(values)) return false;
    if (!this.validRows(values)) return false;
    if (!this.validColumns(values)) return false;
    if (!this.validQuadrants(values)) return false;

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

  private validQuadrants(values: number[]) {
    const quadrant1 = [
      values[0],
      values[1],
      values[2],
      values[9],
      values[10],
      values[11],
      values[18],
      values[19],
      values[20],
    ];
    const quadrant2 = [
      values[3],
      values[4],
      values[5],
      values[12],
      values[13],
      values[14],
      values[21],
      values[22],
      values[23],
    ];
    const quadrant3 = [
      values[6],
      values[7],
      values[8],
      values[15],
      values[16],
      values[17],
      values[24],
      values[25],
      values[26],
    ];
    const quadrant4 = [
      values[27],
      values[28],
      values[29],
      values[36],
      values[37],
      values[38],
      values[45],
      values[46],
      values[47],
    ];
    const quadrant5 = [
      values[30],
      values[31],
      values[32],
      values[39],
      values[40],
      values[41],
      values[48],
      values[49],
      values[50],
    ];
    const quadrant6 = [
      values[33],
      values[34],
      values[35],
      values[42],
      values[43],
      values[44],
      values[51],
      values[52],
      values[53],
    ];
    const quadrant7 = [
      values[54],
      values[55],
      values[56],
      values[63],
      values[64],
      values[65],
      values[72],
      values[73],
      values[74],
    ];
    const quadrant8 = [
      values[57],
      values[58],
      values[59],
      values[66],
      values[67],
      values[68],
      values[75],
      values[76],
      values[77],
    ];
    const quadrant9 = [
      values[60],
      values[61],
      values[62],
      values[69],
      values[70],
      values[71],
      values[78],
      values[79],
      values[80],
    ];

    const validQuadrant1 = this.allAreDifferent(quadrant1);
    const validQuadrant2 = this.allAreDifferent(quadrant2);
    const validQuadrant3 = this.allAreDifferent(quadrant3);
    const validQuadrant4 = this.allAreDifferent(quadrant4);
    const validQuadrant5 = this.allAreDifferent(quadrant5);
    const validQuadrant6 = this.allAreDifferent(quadrant6);
    const validQuadrant7 = this.allAreDifferent(quadrant7);
    const validQuadrant8 = this.allAreDifferent(quadrant8);
    const validQuadrant9 = this.allAreDifferent(quadrant9);

    return (
      validQuadrant1 &&
      validQuadrant2 &&
      validQuadrant3 &&
      validQuadrant4 &&
      validQuadrant5 &&
      validQuadrant6 &&
      validQuadrant7 &&
      validQuadrant8 &&
      validQuadrant9
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
