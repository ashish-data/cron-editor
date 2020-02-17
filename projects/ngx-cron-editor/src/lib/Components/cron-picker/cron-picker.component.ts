import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CronExpression, IExpression} from '../../Model/cron-expression';
import cronstrue from 'cronstrue/i18n';
import {MatFormFieldControl} from '@angular/material';
import {NgControl} from '@angular/forms';
import {Observable} from 'rxjs';



@Component({
  selector: 'ngx-cron-picker',
  templateUrl: './cron-picker.component.html',
  styleUrls: ['./cron-picker.component.scss'],

})
export class CronPickerComponent implements OnInit {

  @Input() expressions: IExpression[] = [];
  @Input() locale = 'en';
  @Output() selectedExpression = new EventEmitter();
   parsedExpression: IExpression[] = [];

  constructor() {
  }

  ngOnInit(): void {

    this.expressions.forEach( (expression) => {

      if (this.cronIsValid(expression.expression)) {
        this.parsedExpression.push(expression);
      }
    });
  }

  buildVerboseExpression(expression: string) {

    if (expression ) {
      const cronExpression = this.buildModel(expression);

      if (cronExpression && cronExpression.Month === '?') {
        cronExpression.Month = '*';
        return cronstrue.toString(cronExpression.toString(), {locale: this.locale});
      }

      if (cronExpression ) {
        return cronstrue.toString(cronExpression.toString(), {locale: this.locale});
      }
    }
  }


  expressionSelected(expression: any) {

    if (expression) {

      const otherChips = this.expressions.filter(e => e.expression !== expression.expression);

      if (otherChips) {
        otherChips.forEach((exp) => {
          exp.selected = false;
        });
      }

      const selectedExpression = this.expressions.filter(exp => exp.expression === expression);
      if (selectedExpression) {
        expression.selected = true;
      }

      this.selectedExpression.emit(expression);
    }
  }

  cronIsValid(expression: string): boolean {
    if (expression) {
      const cronParts = expression.split(' ');
      return cronParts.length === 5;
    }
    return false;
  }

  private buildModel(expression: string): CronExpression {

    const cronExpression = new CronExpression();
    if (expression && this.cronIsValid(expression)) {

      const cronPart = expression.split(' ');
      cronExpression.Seconds = '0'; // cronPart[0].toString();
      cronExpression.Hours = cronPart[0].toString();
      cronExpression.Minutes = cronPart[1].toString();
      cronExpression.DayOfTheMonth = cronPart[2].toString();
      cronExpression.Month = cronPart[3].toString();
      cronExpression.DayOfTheWeek = cronPart[4].toString();
      // cronExpression.Year = cronPart[6].toString();

      return cronExpression;
    }
  }

}
