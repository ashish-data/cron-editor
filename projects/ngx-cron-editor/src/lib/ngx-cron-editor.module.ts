import {NgModule} from '@angular/core';
import {NgxCronEditorComponent} from './ngx-cron-editor.component';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatChipsModule, MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatRadioModule,
  MatSelectModule, MatSliderModule, MatSlideToggleModule, MatStepperModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {ExpressionSelectorComponent} from './Components/expression-selector/expression-selector.component';
import {DayExpressionSelectorComponent} from './Components/Day/day-expression.component';
import {TimeSelectorComponent} from './Components/Time/time-selector.component';
import {TextMaskModule} from 'angular2-text-mask';



@NgModule({
  declarations: [NgxCronEditorComponent,
    ExpressionSelectorComponent, DayExpressionSelectorComponent, TimeSelectorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDividerModule,
    MatCardModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatExpansionModule,
    MatChipsModule,
    MatListModule,
    FormsModule,
    TextMaskModule
  ],
  exports: [NgxCronEditorComponent]
})
export class NgxCronEditorModule {
}
