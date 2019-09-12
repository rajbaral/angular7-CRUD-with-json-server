import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';

import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      providers: [
        AppService,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));
});
