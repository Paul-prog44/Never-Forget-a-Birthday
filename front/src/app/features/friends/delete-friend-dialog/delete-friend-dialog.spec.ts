import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFriendDialog } from './delete-friend-dialog';

describe('DeleteFriendDialog', () => {
  let component: DeleteFriendDialog;
  let fixture: ComponentFixture<DeleteFriendDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFriendDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteFriendDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
