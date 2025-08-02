import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Namaste');
    expect(compiled.querySelector('.welcome-text')?.textContent)
      .toContain('Welcome to YogaFlow');
  });

  it('should have a meditation image', () => {
    const img = fixture.nativeElement.querySelector('.welcome-img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('/assets/waterfall.jpg');
    expect(img.alt).toBe('Meditation Spot');
  });

  it('should display navigation buttons', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.nav-buttons a'));
    expect(navLinks.length).toBe(3); // three <a> elements
    expect(navLinks[0].nativeElement.textContent).toContain('Explore Poses');
    expect(navLinks[1].nativeElement.textContent).toContain('View Routines');
    expect(navLinks[2].nativeElement.textContent).toContain('Create A New Routine');
  });

});
