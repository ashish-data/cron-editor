import cronstrue from 'cronstrue';

export class Options {
  layout = 'tab';
  showYear ? = false;
  expressions: IExpression[] = [];
}

export class CronExpression {

  constructor() {
  }

  Seconds = '0';
  Minutes = '0';
  Hours = '0';
  DayOfTheMonth = '*';
  Month = '*';
  DayOfTheWeek = '*';
  Year = '*';
  Separator = ' ';
  value = '';

  verbose = () => cronstrue.toString(this.toString());
  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}




export interface IExpression {
  expression: string;
  text?: string;
}
