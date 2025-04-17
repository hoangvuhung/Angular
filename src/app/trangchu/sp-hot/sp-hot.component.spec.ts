import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpHotComponent } from './sp-hot.component';

describe('SpHotComponent', () => {
  let component: SpHotComponent;
  let fixture: ComponentFixture<SpHotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpHotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
