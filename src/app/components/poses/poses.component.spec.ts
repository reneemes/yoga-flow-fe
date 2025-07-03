import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PosesComponent } from './poses.component';
import { PosesFetchService } from '../../services/poses-fetch/poses-fetch.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PosesComponent', () => {
  let component: PosesComponent;
  let fixture: ComponentFixture<PosesComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPoses = [
    {
      data: {
        id: 2,
        type: 'pose',
        attributes: {
          name: 'Mountain Pose',
          sanskrit_name: 'Tadasana',
          image_url: 'URL here...'
        }
      }
    },
    {
      data: {
        id: 1,
        type: 'pose',
        attributes: {
          name: 'Downward Dog',
          sanskrit_name: 'Adho Mukha Svanasana',
          image_url: 'URL here...'
        }
      }
    }
  ]

  beforeEach(async () => {
    const poseServiceSpy = jasmine.createSpyObj<PosesFetchService>(['getPoses']);
    poseServiceSpy.getPoses.and.callFake(() => {
      return of(mockPoses)
    });
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PosesComponent],
      providers: [
        {
          provide: PosesFetchService,
          useValue: poseServiceSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));

  it('should fetch yoga poses and set them to data and allData variables', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    let poseName = fixture.debugElement.query(By.css('[id="2"] h3'));
    expect(fixture.debugElement.query(By.css('.poseName'))).toBeTruthy();
    expect(poseName.nativeNode.textContent).toBe('Mountain Pose');

    poseName = fixture.debugElement.query(By.css('[id="2"] p'));
    expect(poseName.nativeNode.textContent).toBe('Tadasana');
  }));

  it('should return all data when search is empty', () => {
    component.poseSearch = '';
    component.searchPoses({ target: { value: '' } });

    component.poses$.subscribe(data => {
      expect(data).toEqual(mockPoses);
    });
  });

  it('should search and filter by English name', () => {
    component.poseSearch = 'mountain';
    component.searchPoses({ target: { value: 'mountain' } });

    component.poses$.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].data.attributes.name).toBe('Mountain Pose');
    });
  });

  it('should search and filter by Sanskrit name', () => {
    component.poseSearch = 'tadasana';
    component.searchPoses({ target: { value: 'tadasana' } });

    component.poses$.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].data.attributes.sanskrit_name).toBe('Tadasana');
    });
  });

  it('should return an empty array if no matches are found', () => {
    component.poseSearch = 'muffin';
    component.searchPoses({ target: { value: 'muffin' } });

    component.poses$.subscribe(data => {
      expect(data).toEqual([]);
    });
  });

  it('should navigate to the correct pose route when clicked', () => {
    const poseId = 1;
    component.handlePoseClick(poseId);

    expect(routerSpy.navigate).toHaveBeenCalledWith([`poses/${poseId}`]);
  });

});
