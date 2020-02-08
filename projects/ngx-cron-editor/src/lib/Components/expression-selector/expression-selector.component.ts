import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatRadioChange} from '@angular/material';

import {
  HourCronExpression,
  ICronExpression,
  MinutesCronExpression, MonthCronExpression,
  SecondsCronExpression,
  YearCronExpression
} from '../../Model/cron-expression';
import {ExpressionType } from '../../Model/enums';



@Component({
  selector: 'exrpression-selector',
  templateUrl: './expression-selector.component.html',
  styleUrls: ['./expression-selector.component.scss'],

})
export class ExpressionSelectorComponent implements OnInit, AfterViewInit {

  private croneExpression: ICronExpression;
  expressionFormGroup: FormGroup;

  minHours = 1;
  maxHours = 24;
  minSeconds = 0;
  maxSeconds = 59;
  minMinutes = 0;
  maxMinutes = 59;
  minMonths = 1;
  maxMonths = 12;
  minYear = 2020;
  maxYear = 2025;

  @Input() expressionType: ExpressionType;
  @Input() expression: string;
  @Output() expressionChange = new EventEmitter();

  @ViewChild('radioButtonEveryTimeUnit', {static: true}) radioButtonEveryTimeUnit: HTMLInputElement;
  @ViewChild('radioButtonIncrement', {static: true}) radioButtonIncrement: HTMLInputElement;
  @ViewChild('radioButtonRange', {static: true}) radioButtonRange: HTMLInputElement;

  constructor(private formBuilder: FormBuilder) {
    console.log(this.expressionType);
  }

  ngAfterViewInit(): void {
    console.log(this.expressionType);
  }

  get minValue(): number {
    if (this.expressionType === ExpressionType.Seconds) {
      return this.minSeconds;
    } else if (this.expressionType === ExpressionType.Minute) {
      return this.minMinutes;
    } else if (this.expressionType === ExpressionType.Hour) {
      return this.minHours;
    } else if (this.expressionType === ExpressionType.Month) {
      return this.minMonths;
    } else if (this.expressionType === ExpressionType.Year) {
      return this.minYear;
    }
  }

  get maxValue(): number {
    if (this.expressionType === ExpressionType.Seconds) {
      return this.maxSeconds;
    } else if (this.expressionType === ExpressionType.Minute) {
      return this.maxMinutes;
    } else if (this.expressionType === ExpressionType.Hour) {
      return this.maxHours;
    } else if (this.expressionType === ExpressionType.Month) {
      return this.maxMonths;
    } else if (this.expressionType === ExpressionType.Year) {
      return this.maxYear;
    }
  }

  cronExpression(): ICronExpression {
    if (this.expressionType === ExpressionType.Seconds) {
      return new SecondsCronExpression();
    } else if (this.expressionType === ExpressionType.Minute) {
      return new MinutesCronExpression();
    } else if (this.expressionType === ExpressionType.Hour) {
      return new HourCronExpression();
    } else if (this.expressionType === ExpressionType.Month) {
      return new MonthCronExpression();
    } else if (this.expressionType === ExpressionType.Year) {
      return new YearCronExpression();
    }
  }

  ngOnInit(): void {

    this.croneExpression = this.cronExpression();

    this.expressionFormGroup = this.formBuilder.group({
      everyTimeUnit: '*',
      increment: this.formBuilder.group({
        interval: [0],
        starting: [0]
      }),
      specificTimeUnit: this.formBuilder.group({
        timeUnit: []
      }),
      range: this.formBuilder.group({
        start: [0],
        end: [0]
      })
    });

    this.expressionFormGroup.valueChanges.subscribe(value => this.buildCronExpression(value));
    this.expressionChange.emit(this.croneExpression);
  }

  private buildCronExpression(data) {
    if (this.expressionType === ExpressionType.Seconds) {
      this.buildSecondsCron(data);
    } else if (this.expressionType === ExpressionType.Minute) {
      this.buildMinuteCron(data);
    } else if (this.expressionType === ExpressionType.Hour) {
      this.buildHourCron(data);
    } else if (this.expressionType === ExpressionType.Month) {
      this.buildMonthCron(data);
    } else if (this.expressionType === ExpressionType.Year) {
      this.buildYearCron(data);
    }
  }


  onSelectionChange(radioSelection: MatRadioChange) {


    if (this.expressionType === ExpressionType.Seconds) {
      this.buildSecondsCron(this.expressionFormGroup.value);
    } else if (this.expressionType === ExpressionType.Minute) {
      this.buildMinuteCron(this.expressionFormGroup.value);
    } else if (this.expressionType === ExpressionType.Hour) {
      this.buildHourCron(this.expressionFormGroup.value);
    } else if (this.expressionType === ExpressionType.Month) {
      this.buildMonthCron(this.expressionFormGroup.value);
    } else if (this.expressionType === ExpressionType.Year) {
      this.buildYearCron(this.expressionFormGroup.value);
    }
  }


  private buildSecondsCron(data: any) {
    if (this.radioButtonEveryTimeUnit.checked) {
      this.croneExpression.Seconds = '*';
    } else if (this.radioButtonIncrement.checked) {
      this.croneExpression.Seconds = `${data.increment.starting}/${data.increment.interval}`;
    } else if (this.radioButtonRange.checked) {
      this.croneExpression.Seconds = `${data.range.start}-${data.range.end}`;
    }
    this.expressionChange.emit(this.croneExpression);
  }

  private buildHourCron(data: any) {

    if (this.radioButtonEveryTimeUnit.checked) {
      this.croneExpression.Hours = '*';
    } else if (this.radioButtonIncrement.checked) {
      this.croneExpression.Hours = `${data.increment.starting}/${data.increment.interval}`;
    } else if (this.radioButtonRange.checked) {
      this.croneExpression.Hours = `${data.range.start}-${data.range.end}`;
    }
    this.expressionChange.emit(this.croneExpression);
  }

  private buildMinuteCron(data: any) {
    if (this.radioButtonEveryTimeUnit.checked) {
      this.croneExpression.Minutes = '*';
    } else if (this.radioButtonIncrement.checked) {
      this.croneExpression.Minutes = `${data.increment.starting}/${data.increment.interval}`;
    } else if (this.radioButtonRange.checked) {
      this.croneExpression.Minutes = `${data.range.start}-${data.range.end}`;
    }
    this.expressionChange.emit(this.croneExpression);
  }

  private buildMonthCron(data: any) {
    if (this.radioButtonEveryTimeUnit.checked) {
      this.croneExpression.Month = '*';
    } else if (this.radioButtonIncrement.checked) {
      this.croneExpression.Month = `${data.increment.starting}/${data.increment.interval}`;
    } else if (this.radioButtonRange.checked) {
      this.croneExpression.Month = `${data.range.start}-${data.range.end}`;
    }
    this.expressionChange.emit(this.croneExpression);
  }

  private buildYearCron(data: any) {
    if (this.radioButtonEveryTimeUnit.checked) {
      this.croneExpression.Year = '*';
    } else if (this.radioButtonIncrement.checked) {
      this.croneExpression.Year = `${data.increment.starting}/${data.increment.interval}`;
    } else if (this.radioButtonRange.checked) {
      this.croneExpression.Year = `${data.range.start}-${data.range.end}`;
    }
    this.expressionChange.emit(this.croneExpression);
  }
}
