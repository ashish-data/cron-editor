import {Component} from '@angular/core';
import {IExpression, Options, CronExpression} from '@ashishp/ngx-cron-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cron-editor';

  get options(): Options {
    const options = new Options();
    options.expressions = this.initializeDefaultExpression;
    options.showYear = true;
    return options;
  }

  get initializeDefaultExpression(): IExpression[] {
    const expressions: IExpression[] = [];

    expressions.push({expression: '0 0 0 * ? * *', text: ''});
    expressions.push({expression: '0 0 0 */6 ? * *'});
    expressions.push({expression: '0 0 0 12 * * TUE'});
    return expressions;
  }

  cronExpression(expression: CronExpression) {
    if (expression) {
      console.log(expression.toString());
    }
  }
}
