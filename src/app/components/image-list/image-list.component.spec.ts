import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ImageDataModel } from '../../models/image.model';

import { ImageListComponent } from './image-list.component';

const mockedImagesData: ImageDataModel[] = [
  { id: 0, src$: of({}) },
  { id: 1, src$: of({}) },
  { id: 2, src$: of({}) },
  { id: 3, src$: of({}) },
];
describe('ImageListComponent', () => {
  let component: ImageListComponent;
  let fixture: ComponentFixture<ImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageListComponent],
    })
      .overrideComponent(ImageListComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty message', () => {
    const message = fixture.debugElement.query(By.css('h1'))
      .nativeElement as HTMLElement;

    expect(message.textContent).toContain('No favorites images');
  });

  it('should show correct images amount in template', () => {
    component.imagesData = mockedImagesData;
    fixture.detectChanges();

    const imagesCards = fixture.debugElement.queryAll(
      By.css('[data-testid="image-card"]')
    );

    expect(imagesCards.length).toBe(4);
  });

  it('should click on image and emit event', () => {
    component.imagesData = mockedImagesData;
    fixture.detectChanges();

    const imagesCard = fixture.debugElement.query(
      By.css('[data-testid="image-card"]')
    );
    const emitSpy = jest.spyOn(component.imageClicked, 'emit');

    imagesCard.nativeElement.click();

    expect(emitSpy).toHaveBeenCalledWith(0);
  });
});
