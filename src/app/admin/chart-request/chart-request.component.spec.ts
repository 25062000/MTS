import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRequestComponent } from './chart-request.component';

describe('ChartRequestComponent', () => {
  let component: ChartRequestComponent;
  let fixture: ComponentFixture<ChartRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
