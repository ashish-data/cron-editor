import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatRadioChange} from '@angular/material';

import {
  DayCronExpression, ICronExpression
} from '../../Model/cron-expression';
import {ExpressionType} from '../../Model/enums';


@Component({
  selector: 'day-exrpression-selector',
  templateUrl: './day-expression.component.html',
  styleUrls: ['./day-expression.component.scss'],

})
export class DayExpressionSelectorComponent implements OnInit, AfterViewInit {

  private croneExpression: ICronExpression;
  expressionFormGroup: FormGroup;

  weekIntervalDayMinValue = 1;
  weekIntervalDayMaxValue = 7;
  weeks = [
    {value: '1', viewValue: 'Sunday'},
    {value: '2', viewValue: 'Monday'},
    {value: '3', viewValue: 'Tuesday'},
    {value: '4', viewValue: 'Wednesday'},
    {value: '5', viewValue: 'Thursday'},
    {value: '6', viewValue: 'Friday'},
    {value: '7', viewValue: 'Saturday'}
  ];

  @Input() expressionType: ExpressionType;
  @Input() expression: string;
  @Output() expressionChange = new EventEmitter();

  @ViewChild('radioButtonEveryTimeUnit', {static: true}) radioButtonEveryTimeUnit: HTMLInputElement;
  @ViewChild('radioButtonIncrement', {static: true}) radioButtonIncrement: HTMLInputElement;
  @ViewChild('radioButtonRange', {static: true}) radioButtonRange: HTMLInputElement;

  constructor(private formBuilder: FormBuilder) {
  }

  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

    this.croneExpression = new DayCronExpression();

    this.expressionFormGroup = this.formBuilder.group({
      everyDay: '*',
      weekInterval: this.formBuilder.group({
        day: [0],
        week: [0]
      }),
      daysInterval: this.formBuilder.group({
        days: [0],
        startingDay: [0]
      }),
      daysOfTheWeek: [],
      daysOfTheMonth: [],
      lastDayOfTheMonth: [],
      lastWeekDayOfTheMonth: [],
      noOfDaysBeforeEndOfTheMonth: [],
      nThDayOfTheMonth: []
    });

    this.expressionFormGroup.valueChanges.subscribe(value => this.buildDayCronExpression(value));
    this.expressionChange.emit(this.croneExpression);
  }

  private buildDayCronExpression(data: any) {

  }

  onSelectionChange(radioSelection: MatRadioChange) {
    this.buildDayCronExpression(this.expressionFormGroup.value);
  }
}
