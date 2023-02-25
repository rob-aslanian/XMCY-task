import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';

import { FetchImageService } from './fetch-image.service';

describe('FetchImageService', () => {
  let service: FetchImageService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, DomSanitizer],
    });
    service = TestBed.inject(FetchImageService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch photos by id', () => {
    const id = 10;

    lastValueFrom(service.fetchImage(id));

    const req = httpController.expectOne({
      url: `/images/id/${id}/1920/1080`,
    });

    expect(req.request.method).toBe('GET');
    req.flush(new Blob());
  });
});
