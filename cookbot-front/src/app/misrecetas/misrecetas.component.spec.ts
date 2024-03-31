import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisrecetasComponent } from './misrecetas.component';

describe('MisrecetasComponent', () => {
  let component: MisrecetasComponent;
  let fixture: ComponentFixture<MisrecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisrecetasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisrecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
