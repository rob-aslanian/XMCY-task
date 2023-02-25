import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageDataModel } from '../../models/image.model';
import { ImageCardComponent } from '../image-card/image-card.component';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, ImageCardComponent],
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListComponent {
  @Input() public imagesData?: ImageDataModel[];

  @Output() public imageClicked = new EventEmitter<number>();

  public trackByFn(_index: number, item: ImageDataModel) {
    return item.id;
  }
}
