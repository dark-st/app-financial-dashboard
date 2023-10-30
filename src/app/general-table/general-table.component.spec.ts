import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTableComponent } from './general-table.component';

describe('GeneralTableComponent', () => {
  let component: GeneralTableComponent;
  let fixture: ComponentFixture<GeneralTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralTableComponent]
    });
    fixture = TestBed.createComponent(GeneralTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
