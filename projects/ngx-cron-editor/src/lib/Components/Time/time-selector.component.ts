import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatRadioChange} from '@angular/material';
import {ExpressionMode} from '../../Model/enums';


@Component({
  selector: 'time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],

})
export class TimeSelectorComponent implements OnInit {

  minutesExpressionPart: string;
  hourExpressionPart: string;
  timeFormGroup: FormGroup;

  minMinutes = 1;
  maxMinutes = 60;
  startingMinutesMinValue = 0;
  startingMinutesMaxValue = 59;

  minHours = 1;
  maxHours = 24;
  startingHoursMinValue = 0;
  startingHoursMaxValue = 23;


  @Input() expression: string;
  @Output() minutesExpressionChange = new EventEmitter();
  @Output() hoursExpressionChange = new EventEmitter();

  @ViewChild('radioButtonMinutesEveryTimeUnit', {static: true}) radioButtonMinutesEveryTimeUnit: HTMLInputElement;
  @ViewChild('radioButtonHourEveryTimeUnit', {static: true}) radioButtonHourEveryTimeUnit: HTMLInputElement;

  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initialize();
  }


  minutesSelectionChange(radioSelection: MatRadioChange) {


    if (radioSelection.value === ExpressionMode.EveryTimeUnit) {

      this.timeFormGroup.controls.minutesMode.setValue(ExpressionMode.EveryTimeUnit, {emitEvent: false});

      if (this.radioButtonHourEveryTimeUnit.checked) {
        this.radioButtonHourEveryTimeUnit.checked = false;
        this.timeFormGroup.controls.hoursMode.setValue(ExpressionMode.None, {emitEvent: false});
        this.hourExpressionPart = '0';
        this.hoursExpressionChange.emit(this.hourExpressionPart);
      }

      this.resetMinutesValues();
      this.buildMinutesExpression(this.timeFormGroup.value);

    } else if (radioSelection.value === ExpressionMode.Interval) {

      this.timeFormGroup.controls.minutesMode.setValue(ExpressionMode.Interval, {emitEvent: false});
      this.buildMinutesExpression(this.timeFormGroup.value);
      this.resetMinutesRangeValues();

    } else if (radioSelection.value === ExpressionMode.Range) {

      this.timeFormGroup.controls.minutesMode.setValue(ExpressionMode.Range, {emitEvent: false});
      this.resetMinutesIntervalValues();
      this.buildMinutesExpression(this.timeFormGroup.value);
    }

  }

  hoursSelectionChange(radioSelection: MatRadioChange) {

    if (radioSelection.value === ExpressionMode.EveryTimeUnit) {

      this.timeFormGroup.controls.hoursMode.setValue(ExpressionMode.EveryTimeUnit, {emitEvent: false});

      if (this.radioButtonMinutesEveryTimeUnit.checked) {
        this.radioButtonMinutesEveryTimeUnit.checked = false;
        this.timeFormGroup.controls.minutesMode.setValue(ExpressionMode.None, {emitEvent: false});
        this.minutesExpressionPart = '0';
        this.minutesExpressionChange.emit(this.minutesExpressionPart);
      }

      this.resetHourValues();
      this.buildHourExpression(this.timeFormGroup.value);

    } else if (radioSelection.value === ExpressionMode.Interval) {

      this.timeFormGroup.controls.hoursMode.setValue(ExpressionMode.Interval, {emitEvent: false});
      this.resetHoursRangeValues();
      this.buildHourExpression(this.timeFormGroup.value);

    } else if (radioSelection.value === ExpressionMode.Range) {

      this.timeFormGroup.controls.hoursMode.setValue(ExpressionMode.Range, {emitEvent: false});
      this.resetHoursIntervalValues();
      this.buildHourExpression(this.timeFormGroup.value);

    }
  }

  private buildMinutesExpression(value: any) {

    if (value.minutesMode === ExpressionMode.EveryTimeUnit) {
      this.minutesExpressionPart = '*';
    } else if (value.minutesMode === ExpressionMode.Interval) {
      this.minutesExpressionPart = `${value.minutesIncrementStarting}/${value.minutesIncrementInterval}`;
    } else if (value.minutesMode === ExpressionMode.Range) {
      this.minutesExpressionPart = `${value.minutesRangeStart}-${value.minutesRangeEnd}`;
    } else if (value.minutesMode === ExpressionMode.None) {
      this.minutesExpressionPart = '0';
    }


    this.minutesExpressionChange.emit(this.minutesExpressionPart);
  }

  private buildHourExpression(value: any) {

    if (value.hoursMode === ExpressionMode.EveryTimeUnit) {
      this.hourExpressionPart = '*';
    } else if (value.hoursMode === ExpressionMode.Interval) {
      this.hourExpressionPart = `${value.hoursIncrementStarting}/${value.hoursIncrementInterval}`;
    } else if (value.hoursMode === ExpressionMode.Range) {
      this.hourExpressionPart = `${value.hoursRangeStart}-${value.hoursRangeEnd}`;
    } else if (value.minutesMode === ExpressionMode.None) {
      this.hourExpressionPart = '0';
    }

    this.hoursExpressionChange.emit(this.hourExpressionPart);
  }

  private buildExpression(value: any) {

    this.buildMinutesExpression(value);
    this.buildHourExpression(value);
  }

  private initialize() {

    this.timeFormGroup = this.formBuilder.group({
      minutesIncrementInterval: [0],
      minutesIncrementStarting: [0],
      minutesRangeStart: [0],
      minutesRangeEnd: [0],
      minutesMode: [ExpressionMode.None],
      hoursIncrementInterval: [0],
      hoursIncrementStarting: [0],
      hoursRangeStart: [0],
      hoursRangeEnd: [0],
      hoursMode: [ExpressionMode.Interval],
    });

    this.timeFormGroup.valueChanges.subscribe(value => this.buildExpression(value));

  }

  private resetHourValues() {
    this.resetHoursIntervalValues();
    this.resetHoursRangeValues();
  }

  private resetHoursIntervalValues() {
    this.timeFormGroup.controls.hoursIncrementInterval.setValue(this.minHours, {emitEvent: false});
    this.timeFormGroup.controls.hoursIncrementStarting.setValue(this.startingHoursMinValue, {emitEvent: false});
  }

  private resetHoursRangeValues() {
    this.timeFormGroup.controls.hoursRangeStart.setValue(this.startingHoursMinValue, {emitEvent: false});
    this.timeFormGroup.controls.hoursRangeEnd.setValue(this.startingHoursMinValue, {emitEvent: false});
  }

  private resetMinutesValues() {
    this.resetMinutesIntervalValues();
    this.resetMinutesRangeValues();
  }

  private resetMinutesIntervalValues() {
    this.timeFormGroup.controls.minutesIncrementInterval.setValue(this.minMinutes, {emitEvent: false});
    this.timeFormGroup.controls.minutesIncrementStarting.setValue(this.startingMinutesMinValue, {emitEvent: false});
  }

  private resetMinutesRangeValues() {
    this.timeFormGroup.controls.minutesRangeStart.setValue(this.startingMinutesMinValue, {emitEvent: false});
    this.timeFormGroup.controls.minutesRangeEnd.setValue(this.startingMinutesMinValue, {emitEvent: false});
  }
}


