import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatRadioChange} from '@angular/material';
import {ExpressionMode, ExpressionType} from '../../Model/enums';

@Component({
  selector: 'exrpression-selector',
  templateUrl: './expression-selector.component.html',
  styleUrls: ['./expression-selector.component.scss'],

})
export class ExpressionSelectorComponent implements OnInit {

  rangeEndMonths: IStructure[];
  rangeStartMonths: IStructure[];
  expressionPart: string;
  formGroup: FormGroup;
  everyTimeUnitText = '';
  incrementText = '';
  rangeText = '';
  months = [];

  minMonth = 1;
  maxMonth = 12;

  minRangeYear = 1;
  maxRangeYear = 10;

  startingYearMinValue = 2020;
  startingYearMaxValue = 2040;

  @Input() expressionType: ExpressionType;
  @Input() expression: string;
  @Output() expressionChange = new EventEmitter();

  @ViewChild('radioButtonEveryTimeUnit', {static: true}) radioButtonEveryTimeUnit: HTMLInputElement;
  @ViewChild('radioButtonIncrement', {static: true}) radioButtonIncrement: HTMLInputElement;
  @ViewChild('radioButtonRange', {static: true}) radioButtonRange: HTMLInputElement;


  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.initialize();
  }

  onSelectionChange(radioSelection: MatRadioChange) {


    if (radioSelection.value === ExpressionMode.EveryTimeUnit) {

      this.formGroup.controls.mode.setValue(ExpressionMode.EveryTimeUnit, {emitEvent: false});
      this.resetValues();
      this.buildExpression(this.formGroup.value);

    } else if (radioSelection.value === ExpressionMode.Interval) {

      this.setDefaultIntervalValues();
      this.formGroup.controls.mode.setValue(ExpressionMode.Interval, {emitEvent: false});
      this.buildExpression(this.formGroup.value);
      this.resetRangeValues();

    } else if (radioSelection.value === ExpressionMode.Range) {

      this.setDefaultRangeValues();
      this.resetIntervalValues();
      this.formGroup.controls.mode.setValue(ExpressionMode.Range, {emitEvent: false});
      this.buildExpression(this.formGroup.value);

    }

  }


  private setDefaultRangeValues() {

    if (this.expressionType === ExpressionType.Month) {
      this.formGroup.controls.rangeStart.setValue(this.minMonth, {emitEvent: false});
      this.formGroup.controls.rangeEnd.setValue(this.maxMonth, {emitEvent: false});
    } else if (this.expressionType === ExpressionType.Year) {
      this.formGroup.controls.rangeStart.setValue(this.startingYearMinValue, {emitEvent: false});
      this.formGroup.controls.rangeEnd.setValue(this.startingYearMinValue, {emitEvent: false});
    }
  }

  private setDefaultIntervalValues() {

    if (this.expressionType === ExpressionType.Month) {
      this.formGroup.controls.incrementInterval.setValue(this.minMonth, {emitEvent: false});
      this.formGroup.controls.incrementStarting.setValue(this.minMonth, {emitEvent: false});
    } else if (this.expressionType === ExpressionType.Year) {
      this.formGroup.controls.incrementInterval.setValue(this.minRangeYear, {emitEvent: false});
      this.formGroup.controls.incrementStarting.setValue(this.startingYearMinValue, {emitEvent: false});
    }
  }

  private resetIntervalValues() {
    this.formGroup.controls.incrementInterval.setValue(null, {emitEvent: false});
    this.formGroup.controls.incrementStarting.setValue(null, {emitEvent: false});
  }

  private resetRangeValues() {
    this.formGroup.controls.rangeStart.setValue(null, {emitEvent: false});
    this.formGroup.controls.rangeEnd.setValue(null, {emitEvent: false});
  }

  private resetValues() {
    this.formGroup.controls.incrementInterval.setValue(null, {emitEvent: false});
    this.formGroup.controls.incrementStarting.setValue(null, {emitEvent: false});
    this.formGroup.controls.rangeStart.setValue(null, {emitEvent: false});
    this.formGroup.controls.rangeEnd.setValue(null, {emitEvent: false});
  }

  private buildExpression(value: any) {

    // if (this.expressionType === ExpressionType.Month) {

    if (value.mode === ExpressionMode.EveryTimeUnit) {
      this.expressionPart = '*';
    } else if (value.mode === ExpressionMode.Interval) {

      /*  const incrementInterval = value.incrementInterval === null ? 1 : value.incrementInterval;
        const incrementStarting = value.incrementStarting === null ? 1 : value.incrementStarting;*/
      this.expressionPart = `${value.incrementStarting}/${value.incrementInterval}`;

    } else if (value.mode === ExpressionMode.Range) {

      /*const rangeStart = value.rangeStart === null ? 1 : value.rangeStart;
      const rangeEnd = value.rangeEnd === null ? 12 : value.rangeEnd;*/
      this.expressionPart = `${value.rangeStart}-${value.rangeEnd}`;
    }


    this.expressionChange.emit(this.expressionPart);
    // }

  }


  private initialize() {

    this.initializedText();

    this.rangeEndMonths = this.seedMonth;
    this.rangeStartMonths = this.seedMonth;
    this.months = this.seedMonth;

    this.formGroup = this.formBuilder.group({
      incrementInterval: [0],
      incrementStarting: [null],
      rangeStart: [null],
      rangeEnd: [null],
      mode: [ExpressionMode.EveryTimeUnit]
    });
    this.formGroup.valueChanges.subscribe(value => this.buildExpression(value));
  }


  private initializedText() {
    if (this.expressionType === ExpressionType.Seconds) {
      this.everyTimeUnitText = 'Every second';
      this.incrementText = `seconds(s) starting at second`;
      this.rangeText = 'Every second between';
    } else if (this.expressionType === ExpressionType.Minute) {
      this.everyTimeUnitText = 'Every minute';
      this.incrementText = 'minute(s) starting at minute';
      this.rangeText = 'Every minute between';
    } else if (this.expressionType === ExpressionType.Hour) {
      this.everyTimeUnitText = 'Every hour';
      this.incrementText = 'hour(s) starting at hour';
      this.rangeText = 'Every hour between';
    } else if (this.expressionType === ExpressionType.Month) {
      this.everyTimeUnitText = 'Every month';
      this.incrementText = 'month(s) starting in';
      this.rangeText = 'Every month between';
    } else if (this.expressionType === ExpressionType.Year) {
      this.everyTimeUnitText = 'Any year';
      this.incrementText = 'years(s) starting in';
      this.rangeText = ' Every year between';
    }
  }

  get seedMonth(): IStructure[] {

    return [
      {viewValue: 'January', value: 1},
      {viewValue: 'February', value: 2},
      {viewValue: 'March', value: 3},
      {viewValue: 'April', value: 4},
      {viewValue: 'May', value: 5},
      {viewValue: 'June', value: 6},
      {viewValue: 'July', value: 7},
      {viewValue: 'August', value: 8},
      {viewValue: 'September', value: 9},
      {viewValue: 'October', value: 10},
      {viewValue: 'November', value: 11},
      {viewValue: 'December', value: 12}
    ];
  }



  get startingIntervalMinValue(): number {
    if (this.expressionType === ExpressionType.Year) {
      return this.startingYearMinValue;
    }
  }

  get startingIntervalMaxValue(): number {
    if (this.expressionType === ExpressionType.Year) {
      return this.startingYearMaxValue;
    }
  }

  get minValue(): number {
    if (this.expressionType === ExpressionType.Month) {
      return this.minMonth;
    } else if (this.expressionType === ExpressionType.Year) {
      return this.minRangeYear;
    }
  }


  get maxValue(): number {
    if (this.expressionType === ExpressionType.Month) {
      return this.maxMonth;
    } else if (this.expressionType === ExpressionType.Year) {
      return this.maxRangeYear;
    }
  }

  get isRangeValid(): boolean {
    return this.radioButtonRange.checked && this.formGroup.controls.rangeEnd.invalid;
  }

}

export interface IStructure {
  viewValue;
  value;
}
