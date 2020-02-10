import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatRadioChange} from '@angular/material';


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
  weeks = [
    {value: '1', viewValue: 'Sunday'},
    {value: '2', viewValue: 'Monday'},
    {value: '3', viewValue: 'Tuesday'},
    {value: '4', viewValue: 'Wednesday'},
    {value: '5', viewValue: 'Thursday'},
    {value: '6', viewValue: 'Friday'},
    {value: '7', viewValue: 'Saturday'}
  ];
  days = [];
  daysOfTheWeek = [];

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

    this.getdays();
    this.getDaysOfTheWeek();

    this.croneExpression = new DayCronExpression();

    this.expressionFormGroup = this.formBuilder.group({
      everyDay: '*',
      weekInterval: this.formBuilder.group({
        day: [0],
        week: []
      }),
      daysInterval: this.formBuilder.group({
        days: [0],
        startingDay: [1]
      }),
      daysOfWeek: this.formBuilder.array([...this.daysOfTheWeek]),
      lastDayOfTheMonth: [{value: 'last', disabled: true}],
      lastWeekDayOfTheMonth: [1],
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


 getdays = () => {

   this.days = [
     {viewValue: '1st', value: 1},
     {viewValue: '2nd', value: 2},
     {viewValue: '3rd', value: 3}
   ];

   for (let i = 4; i <= 31; i++) {
     this.days.push({viewValue: `${i}th`, value: i});
   }

 }


 getDaysOfTheWeek = () => {

   this.daysOfTheWeek = [
     {viewValue: 'Sunday', value: 'SUN'},
     {viewValue: 'Monday', value: 'MON'},
     {viewValue: 'Tuesday', value: 'TUE'},
     {viewValue: 'Wednesday', value: 'WED'},
     {viewValue: 'Thursday', value: 'THU'},
     {viewValue: 'Friday', value: 'FRI'},
     {viewValue: 'Saturday', value: 'SAT'}
   ];
 }


}
