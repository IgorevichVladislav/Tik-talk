import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtDropdownComponent } from './tt-dropdown.component';

describe('TtDropdownComponent', () => {
  let component: TtDropdownComponent;
  let fixture: ComponentFixture<TtDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
