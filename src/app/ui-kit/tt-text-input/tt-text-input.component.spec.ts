import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTextInputComponent } from './tt-text-input.component';

describe('TtTextInputComponent', () => {
  let component: TtTextInputComponent;
  let fixture: ComponentFixture<TtTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtTextInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
