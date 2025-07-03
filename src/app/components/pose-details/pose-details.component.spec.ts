import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PoseDetailsComponent } from './pose-details.component';
import { PosesFetchService } from '../../services/poses-fetch/poses-fetch.service';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('PoseDetailsComponent', () => {
  let component: PoseDetailsComponent;
  let fixture: ComponentFixture<PoseDetailsComponent>;

  const mockPose = {
    "data": {
      "id": 1,
      "type": "pose",
      "attributes": {
        "name": "Downward-Facing Dog",
        "sanskrit_name": "Parivṛtta Adho Mukha Svanasana",
        "pose_description": "From downward_dog.html the legs are straight with the sits bones tilted up and reaching for the sky...",
        "translation_name": "parivṛtta = revolved, adho = downward, mukha = facing, śvāna = dog, āsana = posture",
        "pose_benefits": "Stretches the hamstrings, calves, and spine while building strength in the arms and legs.",
        "image_url": "URL"
      }
    }
  };

  const mockedId = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          if (key === 'id') return '1';
          return null;
        }
      }
    }
  };

  beforeEach(async () => {
    const poseServiceSpy = jasmine.createSpyObj<PosesFetchService>(['getOnePose']);
    poseServiceSpy.getOnePose.and.callFake((id: number) => {
      if (id === 1) {
        return of(mockPose);
      }
      return throwError(() => {
        const error: any = new Error(`This is error number ${HttpStatusCode.NotFound}`);
        error.timestamp = Date.now();
        return error;
      });
    });

    await TestBed.configureTestingModule({
      imports: [PoseDetailsComponent],
      providers: [
        {
          provide: PosesFetchService,
          useValue: poseServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: mockedId
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  }));

  it('should fetch yoga pose details', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    // console.log(fixture.debugElement.query(By.css('.pose-name')))
    let poseName = fixture.debugElement.query(By.css('.pose-name'));
    expect(fixture.debugElement.query(By.css('.pose-name'))).toBeTruthy();
    expect(poseName.nativeNode.textContent).toBe('Downward-Facing Dog Pose');
  }));

  it('should format the name, adding "Pose" if it is not already there', () => {
    expect(component.formatName('Tree Pose')).toBe('Tree Pose');

    expect(component.formatName('Tree')).toBe('Tree Pose');
    expect(component.formatName('Mountain')).toBe('Mountain Pose');
  });
});
