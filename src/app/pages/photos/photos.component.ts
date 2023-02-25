import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject, takeUntil, timer } from 'rxjs';
import { ImageListComponent } from '../../components/image-list/image-list.component';
import { InfinityScrollComponent } from '../../components/infinity-scroll/infinity-scroll.component';
import { ImageDataModel } from '../../models/image.model';
import { FetchImageService } from '../../services/fetch-image/fetch-image.service';
import { ImageLocalStorageService } from '../../services/image-local-storage/image-local-storage.service';

const FROM_DELAY_VALUE = 200;
const TO_DELAY_VALUE = 300;

@Component({
  standalone: true,
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  imports: [
    ImageListComponent,
    InfinityScrollComponent,
    MatProgressBarModule,
    NgIf,
  ],
})
export class PhotosComponent {
  private readonly fetchImageService = inject(FetchImageService);
  private readonly imageLocalStorageService = inject(ImageLocalStorageService);

  private readonly imagesAmount = 18;
  private readonly destroy$ = new Subject<void>();

  public isLoading = false;
  public images: ImageDataModel[] = [];

  ngOnInit(): void {
    this.fetchImages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onScrolled(scrolled: boolean): void {
    if (scrolled) {
      const getRandomDelay = this.getRandomFromTo(
        FROM_DELAY_VALUE,
        TO_DELAY_VALUE
      );

      this.isLoading = true;
      timer(getRandomDelay)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.isLoading = false;
          this.fetchImages();
        });
    }
  }

  public onImageClicked(id: number) {
    this.imageLocalStorageService.addImage(id);
  }

  public fetchImages(): void {
    const imageIds = this.getImagesId();
    this.images = [
      ...this.images,
      ...imageIds.map(
        (id) =>
          ({
            id,
            src$: this.fetchImageService.fetchImage(id),
          } as ImageDataModel)
      ),
    ];
  }

  private getRandomFromTo(from: number, to: number): number {
    return Math.floor(Math.random() * to) + from;
  }

  private getImagesId(): number[] {
    let ids = [];
    for (
      let i = this.images.length;
      i < this.images.length + this.imagesAmount;
      i++
    ) {
      ids.push(i);
    }

    return ids;
  }
}
