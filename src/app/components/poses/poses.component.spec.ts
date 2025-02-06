import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosesComponent } from './poses.component';

describe('PosesComponent', () => {
  let component: PosesComponent;
  let fixture: ComponentFixture<PosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
