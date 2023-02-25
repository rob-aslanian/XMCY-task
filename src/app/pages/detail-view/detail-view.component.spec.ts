import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { FetchImageService } from '../../services/fetch-image/fetch-image.service';
import { ImageLocalStorageService } from '../../services/image-local-storage/image-local-storage.service';

import { DetailViewComponent } from './detail-view.component';

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailViewComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        FetchImageService,
        ImageLocalStorageService,
        MatSnackBar,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DetailViewComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch image by id', () => {
    const fetchImageServiceSpy = jest.spyOn(
      FetchImageService.prototype,
      'fetchImage'
    );

    component.ngOnInit();

    expect(fetchImageServiceSpy).toHaveBeenCalledWith(1);
  });

  it('should remove image', () => {
    const imageLocalStorageServiceSpy = jest.spyOn(
      ImageLocalStorageService.prototype,
      'deleteImage'
    );
    const snackBarSpy = jest.spyOn(MatSnackBar.prototype, 'open');

    const removeBtn = fixture.debugElement.query(
      By.css('[data-testid="remove-image-btn"]')
    ).nativeElement as HTMLButtonElement;

    removeBtn.click();

    expect(snackBarSpy).toHaveBeenCalledWith(
      'Image with id: 1 removed from favorites',
      'Close',
      { duration: 1500 }
    );
    expect(imageLocalStorageServiceSpy).toHaveBeenCalledWith(1);
  });
});
