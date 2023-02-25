import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ImageListComponent } from '../../components/image-list/image-list.component';
import { ImageDataModel } from '../../models/image.model';
import { FetchImageService } from '../../services/fetch-image/fetch-image.service';
import { ImageLocalStorageService } from '../../services/image-local-storage/image-local-storage.service';

@Component({
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [ImageListComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private readonly imageLocalStorageService = inject(ImageLocalStorageService);
  private readonly fetchImageService = inject(FetchImageService);
  private readonly router = inject(Router);

  public images?: ImageDataModel[];

  ngOnInit(): void {
    this.images = Array.from(
      this.imageLocalStorageService.getImages().entries()
    ).map(([_, id]) => ({
      id,
      src$: this.fetchImageService.fetchImage(id),
    }));
  }

  public onImageClicked(id: number): void {
    this.router.navigate(['/photos', id]);
  }
}
