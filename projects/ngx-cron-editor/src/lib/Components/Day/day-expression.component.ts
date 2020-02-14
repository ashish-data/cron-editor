import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatCheckboxChange, MatRadioChange} from '@angular/material';


import {DayExpressionMode, ExpressionType} from '../../Model/enums';

@Component({
  selector: 'day-exrpression-selector',
  templateUrl: './day-expression.component.html',
  styleUrls: ['./day-expression.component.scss'],

})
export class DayExpressionSelectorComponent implements OnInit, AfterViewInit {

  constructor(private formBuilder: FormBuilder) {
  }

  dayFormGroup: FormGroup;
  expressionPart: {dayOfWeek: string, dayOfMonth: string};


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


  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

    // this.selectedDays.push('SUN');
    this.initialize();
    this.getDays();
    this.getDaysOfTheWeek();

  }

  private buildDayCronExpression(value: any) {

    if (value.mode === DayExpressionMode.EveryTimeUnit) {
      this.expressionPart  = {dayOfMonth: '*', dayOfWeek: '*'};
    } else if (value.mode === DayExpressionMode.WeekInterval) {

      const dayOfWeek =  `${value.weekIntervalWeek}/${value.weekIntervalDay}`;
      this.expressionPart  = {dayOfMonth: '?', dayOfWeek};

    } else if (value.mode === DayExpressionMode.DayInterval) {

      const dayOfMonth =  `${value.daysIntervalStartingDay}/${value.daysIntervalDays}`;
      this.expressionPart  = {dayOfMonth, dayOfWeek: '?'};

    } else if (value.mode === DayExpressionMode.WeekDay) {

      this.expressionPart  = {dayOfMonth: '?', dayOfWeek: this.selectedDays.join()};

    } else if (value.mode === DayExpressionMode.LastDayOfMonth) {

      this.expressionPart  = {dayOfMonth: 'L', dayOfWeek: '?'};

    } else if (value.mode === DayExpressionMode.LastWeekDayOfMonth) {

      this.expressionPart  = {dayOfMonth: '?', dayOfWeek: value.lastWeekDayOfTheMonth};

    }

    this.expressionChange.emit(this.expressionPart);

  }

  onDayOptionsChange(radioSelection: MatRadioChange) {

    if (radioSelection.value === DayExpressionMode.EveryTimeUnit) {

      this.dayFormGroup.controls.mode.setValue(DayExpressionMode.EveryTimeUnit, {emitEvent: false});
      this.buildDayCronExpression(this.dayFormGroup.value);

    } else if (radioSelection.value === DayExpressionMode.WeekInterval) {

      this.dayFormGroup.controls.mode.setValue(DayExpressionMode.WeekInterval, {emitEvent: false});
      this.buildDayCronExpression(this.dayFormGroup.value);

    } else if (radioSelection.value === DayExpressionMode.DayInterval) {

      this.dayFormGroup.controls.mode.setValue(DayExpressionMode.DayInterval, {emitEvent: false});
      this.buildDayCronExpression(this.dayFormGroup.value);

    } else if (radioSelection.value === DayExpressionMode.WeekDay) {

      this.dayFormGroup.controls.mode.setValue(DayExpressionMode.WeekDay, {emitEvent: false});
      this.buildDayCronExpression(this.dayFormGroup.value);

    } else if (radioSelection.value === DayExpressionMode.LastDayOfMonth) {

      this.dayFormGroup.controls.mode.setValue(DayExpressionMode.LastDayOfMonth, {emitEvent: false});
      this.buildDayCronExpression(this.dayFormGroup.value);

    } else if (radioSelection.value === DayExpressionMode.LastWeekDayOfMonth) {

      this.dayFormGroup.controls.mode.setValue(DayExpressionMode.LastWeekDayOfMonth, {emitEvent: false});
      this.buildDayCronExpression(this.dayFormGroup.value);
    }
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

  }


  getDaysOfTheWeek = () => {

    this.daysOfTheWeek = [
      {viewValue: 'Sunday', value: 'SUN', selected: false},
      {viewValue: 'Monday', value: 'MON', selected: false},
      {viewValue: 'Tuesday', value: 'TUE', selected: false},
      {viewValue: 'Wednesday', value: 'WED', selected: false},
      {viewValue: 'Thursday', value: 'THU', selected: false},
      {viewValue: 'Friday', value: 'FRI', selected: false},
      {viewValue: 'Saturday', value: 'SAT', selected: false}
    ];
  }


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

    this.expressionPart  = {dayOfMonth: '?', dayOfWeek: this.selectedDays.join()};
    this.expressionChange.emit(this.expressionPart);
  }

  private initialize() {


    this.dayFormGroup = this.formBuilder.group({
      weekIntervalDay: [1],
      weekIntervalWeek: [1],
      daysIntervalDays: [1],
      daysIntervalStartingDay: [1],
      daysOfWeek: this.formBuilder.array([...this.daysOfTheWeek]),
      lastDayOfTheMonth: [],
      lastWeekDayOfTheMonth: ['1L'],
      mode: [DayExpressionMode.EveryTimeUnit]
    });

    this.dayFormGroup.valueChanges.subscribe(value => this.buildDayCronExpression(value));

  }
}
