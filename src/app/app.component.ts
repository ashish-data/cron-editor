import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
/*import {CronExpression} from '../../projects/ngx-cron-editor/src/lib/Model/cron-expression';*/
import {MatSelectChange} from '@angular/material';
import {CronExpression} from '@ashishp/ngx-cron-editor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cron-editor';
  public expression = '0 0 1/1 * *';
  cronForm: FormControl;

  layout = 'accordion';
  ngOnInit(): void {
  }


  cronExpression(expression: CronExpression) {

    if (expression) {
      console.log(expression.toString());
    }
  }

  onChange(data: MatSelectChange) {
    this.layout = data.value;
  }
}
