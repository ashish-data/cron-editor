import {ExpressionType} from './enums';

/*export interface ICronExpression {
  Seconds;
  Minutes;
  Hours;
  DayOfTheMonth;
  Month;
  DayOfTheWeek;
  Year;

  toString();
}*/


export class CronExpression {

  constructor() {
  }

  Seconds = '*';
  Minutes = '0';
  Hours = '0';
  DayOfTheMonth = '?';
  Month = '*';
  DayOfTheWeek = '*';
  Year = '*';
  Separator = ' ';
  value = '';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class SecondsCronExpression {

  Seconds = '*';
  Minutes = '0';
  Hours = '0';
  DayOfTheMonth = '?';
  Month = '*';
  DayOfTheWeek = '*';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class MinutesCronExpression {

  Seconds = '*';
  Minutes = '*';
  Hours = '0';
  DayOfTheMonth = '?';
  Month = '*';
  DayOfTheWeek = '*';
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
  DayOfTheMonth = '?';
  Month = '*';
  DayOfTheWeek = '*';
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
  DayOfTheMonth = '?';
  Month = '*';
  DayOfTheWeek = '*';
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
  DayOfTheMonth = '?';
  Month = '*';
  DayOfTheWeek = '*';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}

export class DayCronExpression {

  Seconds = '0';
  Minutes = '0';
  Hours = '0';
  DayOfTheMonth = '?';
  Month = '*';
  DayOfTheWeek = '*';
  Year = '*';
  Separator = ' ';

  toString() {
    return `${this.Seconds}${this.Separator}${this.Minutes}${this.Separator}${this.Hours}${this.Separator}${this.DayOfTheMonth}${this.Separator}${this.Month}${this.Separator}${this.DayOfTheWeek}${this.Separator}${this.Year}`;
  }
}
