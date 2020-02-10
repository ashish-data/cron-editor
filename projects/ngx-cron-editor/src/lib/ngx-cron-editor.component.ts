import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  CronExpression, DayCronExpression,
  HourCronExpression,
  MinutesCronExpression,
  MonthCronExpression,
  SecondsCronExpression,
  YearCronExpression
} from './Model/cron-expression';
import {ExpressionType} from './Model/enums';
import {MatTabChangeEvent} from '@angular/material';

@Component({
  selector: 'ngx-cron-editor',
  templateUrl: './ngx-cron-editor.component.html',
  styleUrls: ['./ngx-cron-editor.component.scss'],

})


export class NgxCronEditorComponent implements OnInit {

  secondsExpressionType: ExpressionType;
  minutesExpressionType: ExpressionType;
  hoursExpressionType: ExpressionType;
  monthsExpressionType: ExpressionType;
  yearExpressionType: ExpressionType;
  cronExpression: CronExpression = new CronExpression();

  @Output() expressionEmitter = new EventEmitter<CronExpression>();
  @Input() layout = 'tab';
  @ViewChild('secondsExpressionSelector' , {static: false}) secondsExpressionSelector: ElementRef;

  constructor() {
    this.secondsExpressionType = ExpressionType.Seconds;
    this.minutesExpressionType = ExpressionType.Minute;
    this.hoursExpressionType = ExpressionType.Hour;
    this.monthsExpressionType = ExpressionType.Month;
    this.yearExpressionType = ExpressionType.Year;
  }

  ngOnInit(): void {

  }

  secondsCronExpressionChange(expression: SecondsCronExpression) {
    this.cronExpression.Seconds = expression.Seconds;
    this.expressionEmitter.emit(this.cronExpression);
  }

  minutesCronExpressionChange(expression: MinutesCronExpression) {
    this.cronExpression.Minutes = expression.Minutes.toString();
    this.expressionEmitter.emit(this.cronExpression);
  }

  hoursCronExpressionChange(expression: HourCronExpression) {
    this.cronExpression.Hours = expression.Hours.toString();
    this.expressionEmitter.emit(this.cronExpression);
  }

  monthCronExpressionChange(expression: MonthCronExpression) {
    this.cronExpression.Month = expression.Month.toString();
    this.expressionEmitter.emit(this.cronExpression);
  }

  yearCronExpressionChange(expression: YearCronExpression) {
    this.cronExpression.Year = expression.Year.toString();
    this.expressionEmitter.emit(this.cronExpression);
  }

  dayCronExpressionChange(expression: DayCronExpression) {
    this.cronExpression.DayOfTheWeek = expression.DayOfTheWeek.toString();
    this.cronExpression.DayOfTheMonth = expression.DayOfTheMonth.toString();
    this.expressionEmitter.emit(this.cronExpression);
  }

  expressionChanged(data: any) {

    // TODO:validate custom expression
    const isValid = true;

    if (isValid) {
      this.cronExpression.value = data.target.value;
    } else {
      this.cronExpression.value = 'invalid format';
    }
  }

  tabChange(tabChange: MatTabChangeEvent) {

  }

  reset() {

  }
}
