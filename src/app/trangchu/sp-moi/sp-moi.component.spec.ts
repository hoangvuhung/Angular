import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpMoiComponent } from './sp-moi.component';

describe('SpMoiComponent', () => {
  let component: SpMoiComponent;
  let fixture: ComponentFixture<SpMoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpMoiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
