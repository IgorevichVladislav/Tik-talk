import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtErrorComponent } from './tt-error.component';

describe('TtErrorComponent', () => {
  let component: TtErrorComponent;
  let fixture: ComponentFixture<TtErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
