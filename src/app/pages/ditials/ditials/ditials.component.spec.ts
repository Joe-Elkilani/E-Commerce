import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitialsComponent } from './ditials.component';

describe('DitialsComponent', () => {
  let component: DitialsComponent;
  let fixture: ComponentFixture<DitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DitialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
