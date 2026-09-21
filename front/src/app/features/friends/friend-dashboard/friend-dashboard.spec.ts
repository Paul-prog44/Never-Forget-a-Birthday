import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendDashboard } from './friend-dashboard';

describe('AddFriend', () => {
  let component: FriendDashboard;
  let fixture: ComponentFixture<FriendDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
