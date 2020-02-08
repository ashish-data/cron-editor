import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCronEditorComponent } from './ngx-cron-editor.component';

describe('NgxCronEditorComponent', () => {
  let component: NgxCronEditorComponent;
  let fixture: ComponentFixture<NgxCronEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCronEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCronEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
