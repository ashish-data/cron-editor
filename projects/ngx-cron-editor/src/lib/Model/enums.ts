export enum ExpressionType {
  Seconds,
  Minute,
  Hour,
  Day,
  Month,
  Year
}

export enum ExpressionMode {
  EveryTimeUnit = '0',
  Interval = '1',
  Range = '2',
  None = '3'
}

export enum DayExpressionMode {
  EveryTimeUnit = '0',
  WeekInterval = '1',
  DayInterval = '2',
  WeekDay = '3',
  LastDayOfMonth = '4',
  LastWeekDayOfMonth = '5'
}

