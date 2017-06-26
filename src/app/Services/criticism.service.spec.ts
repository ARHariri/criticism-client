import { TestBed, inject } from '@angular/core/testing';
import { CriticismServiceService } from './criticism-service.service';

describe('CriticismServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CriticismServiceService]
    });
  });

  it('should ...', inject([CriticismServiceService], (service: CriticismServiceService) => {
    expect(service).toBeTruthy();
  }));
});
