import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtAvatarCircleComponent } from './tt-avatar-circle.component';

describe('TtAvatarCircleComponent', () => {
  let component: TtAvatarCircleComponent;
  let fixture: ComponentFixture<TtAvatarCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtAvatarCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtAvatarCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
