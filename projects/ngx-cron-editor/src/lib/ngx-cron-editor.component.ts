import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CronExpression,
  IExpression,
  Options
} from './Model/cron-expression';
import {ExpressionType} from './Model/enums';
import cronstrue from 'cronstrue';

@Component({
  selector: 'ngx-cron-editor',
  templateUrl: './ngx-cron-editor.component.html',
  styleUrls: ['./ngx-cron-editor.component.scss'],

})
export class NgxCronEditorComponent implements OnInit {

  monthsExpressionType: ExpressionType;
  yearExpressionType: ExpressionType;
  cronExpression: CronExpression = new CronExpression();


  @Input() options: Options;
  @Output() expressionEmitter = new EventEmitter<CronExpression>();

  constructor() {
  }


  ngOnInit(): void {
    this.monthsExpressionType = ExpressionType.Month;
    this.yearExpressionType = ExpressionType.Year;

  }

  buildMinutesExpression(data: any) {
    //console.log(data);
    this.cronExpression.Minutes = data;
    this.expressionEmitter.emit(this.cronExpression);
  }

  buildHoursExpression(data: any) {
    // console.log(data);
    this.cronExpression.Hours = data;
    this.expressionEmitter.emit(this.cronExpression);
  }

  buildMonthExpression(data: any) {
    // console.log(data);
    this.cronExpression.Month = data;
    this.expressionEmitter.emit(this.cronExpression);
  }

  buildYearExpression(data: any) {
    // console.log(data);
    this.cronExpression.Year = data;
    this.expressionEmitter.emit(this.cronExpression);
  }

  buildDayExpression(expression: { dayOfWeek: string, dayOfMonth: string }) {
    console.log(expression);
    this.cronExpression.DayOfTheWeek = expression.dayOfWeek;
    this.cronExpression.DayOfTheMonth = expression.dayOfMonth;
    this.expressionEmitter.emit(this.cronExpression);
  }

  selectPreDefinedExpression(expression: IExpression) {

    if (expression) {
      this.cronExpression = this.buildModel(expression.expression);
      this.expressionEmitter.emit(this.cronExpression);
    }
  }

  buildVerboseExpression(expression: string) {
    return cronstrue.toString(expression);
  }


  cronIsValid(expression: string): boolean {
    if (expression) {
      const cronParts = expression.split(' ');
      return cronParts.length === 7;
    }
    return false;
  }

  private buildModel(expression: string): CronExpression {

    const cronExpression = new CronExpression();
    if (expression && this.cronIsValid(expression)) {

      const cronPart = expression.split(' ');
      cronExpression.Seconds = cronPart[0].toString();
      cronExpression.Hours = cronPart[1].toString();
      cronExpression.Minutes = cronPart[2].toString();
      cronExpression.DayOfTheMonth = cronPart[3].toString();
      cronExpression.Month = cronPart[4].toString();
      cronExpression.DayOfTheWeek = cronPart[5].toString();
      cronExpression.Year = cronPart[6].toString();

      return cronExpression;
    }
  }

}
