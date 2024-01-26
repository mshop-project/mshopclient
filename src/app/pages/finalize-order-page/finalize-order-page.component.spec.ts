import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeOrderPageComponent } from './finalize-order-page.component';

describe('FinalizeOrderPageComponent', () => {
  let component: FinalizeOrderPageComponent;
  let fixture: ComponentFixture<FinalizeOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizeOrderPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalizeOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
