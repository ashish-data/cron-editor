import {Component} from '@angular/core';
import {IExpression, Options, CronExpression, } from '@ashishp/ngx-cron-editor';
import {CronPickerComponent} from '../../projects/ngx-cron-editor/src/lib/Components/cron-picker/cron-picker.component';
// import {CronExpression, IExpression, Options} from '../../projects/ngx-cron-editor/src/lib/Model/cron-expression';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cron-editor';
  expressions: IExpression[] = [];


  constructor() {
    this.initializeDefaultExpression();
  }
/*  get options(): Options {
    const options = new Options();
    options.expressions = this.initializeDefaultExpression;
    options.showYear = true;
    return options;
  }*/
  locale = 'en';

   initializeDefaultExpression() {
     //  replace ? with * for text display
     this.expressions.push({expression: '0 0 * * FRI'});
     this.expressions.push({expression: '0 0 */6 * *', selected: true});
     this.expressions.push({expression: '0 2 * 9-12 TUE'});
   }

  cronExpression(expression: CronExpression) {
    if (expression) {
      console.log(expression.toString());
    }
  }

  selectedExpression(expression: IExpression) {
    console.log(expression.expression);
  }
}
