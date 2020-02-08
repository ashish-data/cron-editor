import {NgModule} from '@angular/core';
import {NgxCronEditorComponent} from './ngx-cron-editor.component';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule, MatSliderModule, MatSlideToggleModule, MatStepperModule,
  MatTabsModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';



import {CommonModule} from '@angular/common';
import {ExpressionSelectorComponent} from './Components/expression-selector/expression-selector.component';
import {DayExpressionSelectorComponent} from './Components/Day/day-expression.component';


@NgModule({
    declarations: [NgxCronEditorComponent,
        ExpressionSelectorComponent, DayExpressionSelectorComponent],
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
    MatExpansionModule
  ],
  exports: [NgxCronEditorComponent]
})
export class NgxCronEditorModule {
}
