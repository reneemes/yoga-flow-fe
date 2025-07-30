import { TestBed } from '@angular/core/testing';
import { PosesFetchService } from './poses-fetch.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('PosesFetchService', () => {
  let service: PosesFetchService;
  // Defining the mock HTTP request
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Importing all the providers needed to mock the request
      providers: [
        PosesFetchService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PosesFetchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return yoga poses', () => {
    service.getPoses().subscribe(result => {
      expect(result).toBeTruthy();
      expect(result[0].data.attributes.name).toBe('Downward Dog');
      expect(result[0].data.attributes.sanskrit_name).toBe('Adho Mukha Svanasana');
    });

    const req = httpMock.expectOne('https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/poses');
    // const req = httpMock.expectOne('http://localhost:3000/api/v1/poses');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        data: {
          id: 1,
          type: 'pose',
          attributes: {
            name: 'Downward Dog',
            sanskrit_name: 'Adho Mukha Svanasana',
            image_url: 'URL'
          }
        }
      }
    ]);
    httpMock.verify();
  });

  it('should return details for one yoga pose', () => {
    service.getOnePose(1).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.data.attributes.pose_description).toBe('Downward Dog description...');
    });

    const req = httpMock.expectOne('https://yoga-flow-7a813c31e5f1.herokuapp.com/api/v1/poses/1');
    // const req = httpMock.expectOne('http://localhost:3000/api/v1/poses/1');
    expect(req.request.method).toBe('GET');
    req.flush(
      {
        data: {
          id: 1,
          type: 'pose',
          attributes: {
            name: 'Downward Dog',
            sanskrit_name: 'Adho Mukha Svanasana',
            pose_description: 'Downward Dog description...',
            pose_benefits: 'Pose benefits...',
            translation_name: 'Translation name...',
            image_url: 'URL'
          }
        }
      }
    )
    httpMock.verify();
  });
});
