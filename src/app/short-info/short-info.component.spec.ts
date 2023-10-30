import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortInfoComponent } from './short-info.component';

describe('ShortInfoComponent', () => {
  let component: ShortInfoComponent;
  let fixture: ComponentFixture<ShortInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortInfoComponent]
    });
    fixture = TestBed.createComponent(ShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
