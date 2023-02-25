import { Injectable } from '@angular/core';
import { Observable, startWith, Subject } from 'rxjs';

const KEY = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class ImageLocalStorageService {
  private readonly imagesAmount$ = new Subject<number>();

  public getImages(): Set<number> {
    if (!localStorage.getItem(KEY)) {
      this.updateLocalStorage(new Set([]));
    }

    const storedImages = JSON.parse(localStorage.getItem(KEY)!);
    return new Set<number>(storedImages);
  }

  public addImage(id: number): void {
    const favoriteImages = this.getImages();
    if (favoriteImages && !favoriteImages.has(id)) {
      const images = new Set<number>(favoriteImages ?? undefined);

      images.add(id);
      this.updateLocalStorage(images);
    }
  }

  public deleteImage(id: number): void {
    const favoriteImages = this.getImages();

    if (favoriteImages && favoriteImages.has(id)) {
      const images = new Set<number>(favoriteImages ?? undefined);

      images.delete(id);
      this.updateLocalStorage(images);
    }
  }

  public favoriteAmount$(): Observable<number> {
    return this.imagesAmount$
      .asObservable()
      .pipe(startWith(this.getImages().size));
  }

  private updateLocalStorage(images: Set<number>): void {
    localStorage.setItem(KEY, JSON.stringify(Array.from(images)));
    this.imagesAmount$.next(images.size);
  }
}
