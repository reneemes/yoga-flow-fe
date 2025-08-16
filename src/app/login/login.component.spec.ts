import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../state/auth/auth.actions';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    // Creates a Jasmine object for Store with spy methods dispatch() and select()
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    // When select() is called on the store, return an observable that emits 'null'
    mockStore.select.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        // This replaces the real NgRx store with the spy object
        { provide: Store, useValue: mockStore}
      ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Login component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginSuccess after a successful login', () => {
    component.user = {
      email: 'dollyP@email.com',
      password: 'Jolene123'
    };

    const form = {
      valid: true
    } as any;

    component.submitLogin(form);

    const req = httpMock.expectOne('https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/sessions');
    // const req = httpMock.expectOne('http://localhost:3000/api/v1/sessions');
    expect(req.request.method).toBe('POST');
    req.flush({
      token: 'user-token',
      user: {
        data: {
          id: 1,
          type: 'user',
          attributes: {
            name: 'Dolly P',
            email: 'dollyP@email.com'
          }
        }
      }
    });

    expect(mockStore.dispatch).toHaveBeenCalledWith(login({ token: 'user-token', name: 'Dolly P' }));
  });
});
