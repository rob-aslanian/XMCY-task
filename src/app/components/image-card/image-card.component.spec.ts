import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageCardComponent } from './image-card.component';

describe('ImageCardComponent', () => {
  let component: ImageCardComponent;
  let fixture: ComponentFixture<ImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it;

  it('should click on card and emit event', () => {
    const cardElement = fixture.debugElement.query(
      By.css('[data-testid="image-card"]')
    ).nativeElement as HTMLElement;
    const emitSpy = jest.spyOn(component.imageClicked, 'emit');
    component.id = 10;
    cardElement.click();

    expect(emitSpy).toHaveBeenCalledWith(10);
  });
});
