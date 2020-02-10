import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cron-editor';
  public cronExpression = '0 0 1/1 * *';
  cronForm: FormControl;

  ngOnInit(): void {
  }
}
