import {Component, Input, OnInit} from '@angular/core';
import {CronOptions} from './Model/options';
import {CronExpression} from './Model/cron-expression';
import {ExpressionType} from './Model/enums';

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

  constructor() {
    this.secondsExpressionType = ExpressionType.Seconds;
    this.minutesExpressionType = ExpressionType.Minute;
    this.hoursExpressionType = ExpressionType.Hour;
    this.monthsExpressionType = ExpressionType.Month;
    this.yearExpressionType = ExpressionType.Year;
  }

  cronExpression: string;

  @Input() public options: CronOptions;


    ngOnInit(): void {

    }

  minutesCronExpressionChange(expression: CronExpression) {
    this.cronExpression = expression.toString();
  }

  secondsCronExpressionChange(expression: CronExpression) {
    this.cronExpression = expression.toString();
  }

  hoursCronExpressionChange(expression: CronExpression) {
    this.cronExpression = expression.toString();
  }
}
