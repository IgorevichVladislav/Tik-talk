import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtSubscriberCardComponent } from './tt-subscriber-card.component';

describe('TtSubscriberCardComponent', () => {
  let component: TtSubscriberCardComponent;
  let fixture: ComponentFixture<TtSubscriberCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtSubscriberCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtSubscriberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
