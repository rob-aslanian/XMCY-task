import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { withStatePipe } from '../../pipes/async-state/async-state.pipe';

@Component({
  standalone: true,
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  imports: [
    MatCardModule,
    withStatePipe,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardComponent {
  @Input() public id!: number;
  @Input() public imageSrc$!: Observable<SafeUrl>;

  @Output() public imageClicked = new EventEmitter<number>();

  public onImageClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.imageClicked.emit(this.id);
  }
}
