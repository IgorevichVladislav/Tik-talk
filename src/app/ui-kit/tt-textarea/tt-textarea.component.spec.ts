import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTextareaComponent } from './tt-textarea.component';

describe('TtTextareaComponent', () => {
  let component: TtTextareaComponent;
  let fixture: ComponentFixture<TtTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
