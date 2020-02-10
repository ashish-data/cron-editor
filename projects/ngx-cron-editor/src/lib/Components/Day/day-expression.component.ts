import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatCheckboxChange, MatRadioChange} from '@angular/material';


import {ExpressionType} from '../../Model/enums';
import {DayCronExpression} from '../../Model/cron-expression';


@Component({
  selector: 'day-exrpression-selector',
  templateUrl: './day-expression.component.html',
  styleUrls: ['./day-expression.component.scss'],

})
export class DayExpressionSelectorComponent implements OnInit, AfterViewInit {

  private croneExpression: DayCronExpression;
  expressionFormGroup: FormGroup;

  weekIntervalDayMinValue = 1;
  weekIntervalDayMaxValue = 7;
  defaultSelectedWeek = '1';
  defaultDayOfTheMonth = '1';
  defaultLastWeekDayOfTheMonth = '1L';
  selectedDays = [];
  minDays = 1;
  maxDays = 31;

  weeks = [
    {value: '1', viewValue: 'Sunday'},
    {value: '2', viewValue: 'Monday'},
    {value: '3', viewValue: 'Tuesday'},
    {value: '4', viewValue: 'Wednesday'},
    {value: '5', viewValue: 'Thursday'},
    {value: '6', viewValue: 'Friday'},
    {value: '7', viewValue: 'Saturday'}
  ];

  lastWeeksDays = [
    {value: '1L', viewValue: 'Sunday'},
    {value: '2L', viewValue: 'Monday'},
    {value: '3L', viewValue: 'Tuesday'},
    {value: '4L', viewValue: 'Wednesday'},
    {value: '5L', viewValue: 'Thursday'},
    {value: '6L', viewValue: 'Friday'},
    {value: '7L', viewValue: 'Saturday'}
  ];

  days = [];
  daysOfTheWeek = [];

  @Input() expressionType: ExpressionType;
  @Input() expression: string;
  @Output() expressionChange = new EventEmitter();

  @ViewChild('radioButtonEveryDay', {static: true}) radioButtonEveryDay: HTMLInputElement;
  @ViewChild('radioButtonWeekInterval', {static: true}) radioButtonWeekInterval: HTMLInputElement;
  @ViewChild('radioButtonDaysInterval', {static: true}) radioButtonDaysInterval: HTMLInputElement;
  @ViewChild('radioButtonDaysOfTheWeek', {static: true}) radioButtonDaysOfTheWeek: HTMLInputElement;
  @ViewChild('radioButtonLastDayOfTheMonth', {static: true}) radioButtonLastDayOfTheMonth: HTMLInputElement;
  @ViewChild('radioButtonLastWeekDayOfTheMonth', {static: true}) radioButtonLastWeekDayOfTheMonth: HTMLInputElement;

  constructor(private formBuilder: FormBuilder) {
  }

  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

    this.getDays();
    this.getDaysOfTheWeek();

    this.croneExpression = new DayCronExpression();

    this.expressionFormGroup = this.formBuilder.group({
      everyDay: '*',
      weekInterval: this.formBuilder.group({
        day: [0],
        week: []
      }),
      daysInterval: this.formBuilder.group({
        days: [1],
        startingDay: []
      }),
      daysOfWeek: this.formBuilder.array([...this.daysOfTheWeek]),
      lastDayOfTheMonth: [{value: 'last', disabled: true}],
      lastWeekDayOfTheMonth: [],
      noOfDaysBeforeEndOfTheMonth: [],
      nThDayOfTheMonth: []
    });

    this.expressionFormGroup.valueChanges.subscribe(value => this.buildDayCronExpression(value));
    this.expressionChange.emit(this.croneExpression);
  }

  private buildDayCronExpression(data: any) {

    if (this.radioButtonEveryDay.checked) {
      this.croneExpression.DayOfTheWeek = '*';
      this.croneExpression.DayOfTheMonth = '?';

    } else if (this.radioButtonWeekInterval.checked) {
      this.croneExpression.DayOfTheMonth = '?';
      this.croneExpression.DayOfTheWeek = `${data.weekInterval.week}/${data.weekInterval.day}`;

    } else if (this.radioButtonDaysInterval.checked) {
      this.croneExpression.DayOfTheMonth = `${data.daysInterval.startingDay}/${data.daysInterval.days}`;
      this.croneExpression.DayOfTheWeek = '?';

    } else if (this.radioButtonDaysOfTheWeek.checked) {
      this.croneExpression.DayOfTheMonth = '?';
      this.croneExpression.DayOfTheWeek = this.selectedDays.join();

    } else if (this.radioButtonLastDayOfTheMonth.checked) {
      this.croneExpression.DayOfTheMonth = 'L';
      this.croneExpression.DayOfTheWeek = '?';

    } else if (this.radioButtonLastWeekDayOfTheMonth.checked) {
      this.croneExpression.DayOfTheMonth = '?';
      this.croneExpression.DayOfTheWeek = data.lastWeekDayOfTheMonth;
    }
    this.expressionChange.emit(this.croneExpression);
  }

  onSelectionChange(radioSelection: MatRadioChange) {
    this.buildDayCronExpression(this.expressionFormGroup.value);
  }


  getDays = () => {

    this.days = [
      {viewValue: '1st', value: '1'},
      {viewValue: '2nd', value: '2'},
      {viewValue: '3rd', value: '3'}
    ];

    for (let i = 4; i <= 31; i++) {
      this.days.push({viewValue: `${i}th`, value: `${i}`});
    }

  };


  getDaysOfTheWeek = () => {

    this.daysOfTheWeek = [
      {viewValue: 'Sunday', value: 'SUN', selected: true},
      {viewValue: 'Monday', value: 'MON'},
      {viewValue: 'Tuesday', value: 'TUE'},
      {viewValue: 'Wednesday', value: 'WED'},
      {viewValue: 'Thursday', value: 'THU'},
      {viewValue: 'Friday', value: 'FRI'},
      {viewValue: 'Saturday', value: 'SAT'}
    ];
  };


  daysSelectionChange(data: MatCheckboxChange) {

    if (!this.selectedDays.includes(data.source.value)) {
      if (data.checked) {
        this.selectedDays.push(data.source.value);
      }
    } else {
      if (!data.checked) {
        this.selectedDays = [...this.selectedDays.filter(d => d !== data.source.value)];
      }
    }

    this.croneExpression.DayOfTheWeek = this.selectedDays.join();
    this.expressionChange.emit(this.croneExpression);
  }
}
