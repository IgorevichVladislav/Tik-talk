import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsWorkspaceComponent } from './chats-workspace.component';

describe('ChatsWorkspaceComponent', () => {
  let component: ChatsWorkspaceComponent;
  let fixture: ComponentFixture<ChatsWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsWorkspaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
