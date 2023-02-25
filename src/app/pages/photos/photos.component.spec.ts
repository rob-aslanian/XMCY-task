import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageLocalStorageService } from '../../services/image-local-storage/image-local-storage.service';

import { PhotosComponent } from './photos.component';

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
});

const DEFAULT_IMAGES_AMOUNT = 18;

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosComponent, HttpClientTestingModule],
      providers: [ImageLocalStorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default image loaded', () => {
    expect(component.images.length).toBe(DEFAULT_IMAGES_AMOUNT);
  });

  it('should load images on scroll', fakeAsync(() => {
    component.onScrolled(true);

    tick(500);

    expect(component.images.length).toBe(DEFAULT_IMAGES_AMOUNT * 2);
  }));

  it('should click on image and save on local storage', () => {
    const imageElement = fixture.debugElement.query(
      By.css('[data-testid="image-card"]')
    ).nativeElement as HTMLElement;

    const imageLocalStorageServiceSpy = jest.spyOn(
      ImageLocalStorageService.prototype,
      'addImage'
    );

    imageElement.click();
    fixture.detectChanges();

    component.onScrolled(true);

    expect(imageLocalStorageServiceSpy).toHaveBeenCalledWith(0);
  });
});
