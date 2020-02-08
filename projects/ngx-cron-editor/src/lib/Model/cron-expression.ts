import {ExpressionType} from './enums';

export interface ICronExpression {
  Seconds;
  Minutes;
  Hours;
  DayOfTheMonth;
  Month;
  DayOfTheWeek;
  Year;

  toString();
}


export abstract class CronExpression implements ICronExpression {

  constructor() {
  }

  Seconds;
  Minutes;
  Hours;
  DayOfTheMonth;
  Month;
  DayOfTheWeek;
  Year;
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class SecondsCronExpression {

  Seconds = '*';
  Minutes = '*';
  Hours = '*';
  DayOfTheMonth = '*';
  Month = '*';
  DayOfTheWeek = '?';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class MinutesCronExpression {

  Seconds = '*';
  Minutes = '*';
  Hours = '*';
  DayOfTheMonth = '*';
  Month = '*';
  DayOfTheWeek = '?';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class HourCronExpression {

  Seconds = '*';
  Minutes = '*';
  Hours = '*';
  DayOfTheMonth = '*';
  Month = '*';
  DayOfTheWeek = '?';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class MonthCronExpression {

  Seconds = '*';
  Minutes = '*';
  Hours = '*';
  DayOfTheMonth = '*';
  Month = '*';
  DayOfTheWeek = '?';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class YearCronExpression {

  Seconds = '*';
  Minutes = '*';
  Hours = '*';
  DayOfTheMonth = '*';
  Month = '*';
  DayOfTheWeek = '?';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class DayCronExpression {

  Seconds = '*';
  Minutes = '*';
  Hours = '*';
  DayOfTheMonth = '*';
  Month = '*';
  DayOfTheWeek = '?';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}
