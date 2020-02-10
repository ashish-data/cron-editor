import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CronExpression, HourCronExpression, MonthCronExpression, SecondsCronExpression, YearCronExpression} from './Model/cron-expression';
import {ExpressionType} from './Model/enums';
import {MinuteCronExpression} from 'ngx-cron-editor/lib/Components/Minute/minute-cron-expression-model';
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
  }

  minutesCronExpressionChange(expression: MinuteCronExpression) {
    this.cronExpression.Minutes = expression.Minutes.toString();
  }

  hoursCronExpressionChange(expression: HourCronExpression) {
    this.cronExpression.Hours = expression.Hours.toString();
  }

  monthCronExpressionChange(expression: MonthCronExpression) {
    this.cronExpression.Month = expression.Month.toString();
  }

  yearCronExpressionChange(expression: YearCronExpression) {
    this.cronExpression.Year = expression.Year.toString();
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
}
