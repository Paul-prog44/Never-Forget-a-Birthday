import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFriendDialog } from './edit-friend-dialog';

describe('EditFriendDialog', () => {
  let component: EditFriendDialog;
  let fixture: ComponentFixture<EditFriendDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFriendDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFriendDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
