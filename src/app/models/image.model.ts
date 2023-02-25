import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export interface ImageDataModel {
  id: number;
  src$: Observable<SafeUrl>;
}
