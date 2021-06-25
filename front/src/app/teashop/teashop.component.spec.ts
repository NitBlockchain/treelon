import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeashopComponent } from './teashop.component';

describe('TeashopComponent', () => {
  let component: TeashopComponent;
  let fixture: ComponentFixture<TeashopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeashopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeashopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
