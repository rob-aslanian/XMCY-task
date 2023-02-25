import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageCardComponent } from '../../components/image-card/image-card.component';
import { FetchImageService } from '../../services/fetch-image/fetch-image.service';
import { ImageLocalStorageService } from '../../services/image-local-storage/image-local-storage.service';

@Component({
  standalone: true,
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  imports: [
    ImageCardComponent,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailViewComponent {
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fetchImageService = inject(FetchImageService);
  private readonly imageLocalStorageService = inject(ImageLocalStorageService);
  private readonly snackBar = inject(MatSnackBar);

  public id!: number;
  public image!: Observable<SafeUrl>;

  ngOnInit(): void {
    this.fetchImage();
  }

  public onRemoveImage(): void {
    this.imageLocalStorageService.deleteImage(this.id);
    this.snackBar.open(
      `Image with id: ${this.id} removed from favorites`,
      'Close',
      {
        duration: 1500,
      }
    );
    this.router.navigate(['/favorites']);
  }

  private fetchImage(): void {
    const { id } = this.activateRoute.snapshot.params;

    this.id = Number(id);
    this.image = this.fetchImageService.fetchImage(this.id);
  }
}
