import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FetchImageService } from '../../services/fetch-image/fetch-image.service';
import { ImageLocalStorageService } from '../../services/image-local-storage/image-local-storage.service';

import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const imageLocalStorageServiceSpy = jest
    .spyOn(ImageLocalStorageService.prototype, 'getImages')
    .mockImplementation()
    .mockReturnValue(new Set<number>([0, 1, 2, 3]));

  const routerSpy = jest.spyOn(Router.prototype, 'navigate');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, HttpClientTestingModule],
      providers: [
        FetchImageService,
        {
          provide: ImageLocalStorageService,
          useValue: {
            getImages: imageLocalStorageServiceSpy,
          },
        },

        {
          provide: Router,
          useValue: {
            navigate: routerSpy,
          },
        },
      ],
    })
      .overrideComponent(FavoritesComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get images from local storage', () => {
    const fetchImageServiceSpy = jest.spyOn(
      FetchImageService.prototype,
      'fetchImage'
    );

    const imageElements = fixture.debugElement.queryAll(
      By.css('[data-testid="image-card"]')
    );

    component.ngOnInit();

    expect(fetchImageServiceSpy).toHaveBeenCalledTimes(4);
    expect(imageElements.length).toBe(4);
    expect(component.images?.length).toBe(4);
  });

  it('should navigate to details page on click', () => {
    const imageElement = fixture.debugElement.query(
      By.css('[data-testid="image-card"]')
    ).nativeElement as HTMLElement;

    imageElement.click();

    expect(routerSpy).toHaveBeenCalledWith(['/photos', 0]);
  });
});
