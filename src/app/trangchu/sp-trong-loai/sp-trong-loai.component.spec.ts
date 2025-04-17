import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpTrongLoaiComponent } from './sp-trong-loai.component';

describe('SpTrongLoaiComponent', () => {
  let component: SpTrongLoaiComponent;
  let fixture: ComponentFixture<SpTrongLoaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpTrongLoaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpTrongLoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
