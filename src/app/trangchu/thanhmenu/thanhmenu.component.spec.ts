import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhmenuComponent } from './thanhmenu.component';

describe('ThanhmenuComponent', () => {
  let component: ThanhmenuComponent;
  let fixture: ComponentFixture<ThanhmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanhmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanhmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
