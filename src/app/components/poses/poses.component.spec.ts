import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PosesComponent } from './poses.component';
import { PosesFetchService } from '../../services/poses-fetch/poses-fetch.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('PosesComponent', () => {
  let component: PosesComponent;
  let fixture: ComponentFixture<PosesComponent>;
  let mockFetchService: jasmine.SpyObj<PosesFetchService>
  let mockRouter: jasmine.SpyObj<Router>;

  const mockPoseData = [
    {
      data: {
        attributes: {
          name: 'Mountain Pose',
          sanskrit_name: 'Tadasana',
          image_url: 'URL here...'
        }
      }
    },
    {
      data: {
        attributes: {
          name: 'Downward Dog',
          sanskrit_name: 'Adho Mukha Svanasana',
          image_url: 'URL here...'
        }
      }
    }
  ];

  beforeEach(async () => {
    // mockFetchService = jasmine.createSpyObj('PosesFetchService', ['fetchPoses']);
    // mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PosesComponent, FormsModule, CommonModule],
      providers: [
        { provide: PosesFetchService, useValue: mockFetchService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch yoga poses and set them to data and allData variables', async () => {
    // mocking the method fetchPoses and telling it what value to return
    mockFetchService.fetchPoses.and.returnValue(Promise.resolve(mockPoseData));

    fixture = TestBed.createComponent(PosesComponent);
    component = fixture.componentInstance;

    await component.ngOnInit(); // call manually before detectChanges
    fixture.detectChanges();

    expect(mockFetchService.fetchPoses).toHaveBeenCalled();
    expect(component.data).toEqual(mockPoseData);
    expect(component.allData).toEqual(mockPoseData);
  });
});
