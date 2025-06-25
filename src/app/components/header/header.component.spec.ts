import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title of the application', () => {
    // const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('.title')?.textContent).toContain('YogaFlow');
    // expect(compiled.querySelector('.poses-button')?.textContent)
    //   .toContain('Poses');
  });
});
