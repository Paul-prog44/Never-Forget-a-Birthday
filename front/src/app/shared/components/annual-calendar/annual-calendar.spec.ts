import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualCalendar } from './annual-calendar';

describe('AnnualCalendar', () => {
  let component: AnnualCalendar;
  let fixture: ComponentFixture<AnnualCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnualCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
